// db-utils.js
// Firestore Database Utilities and Helper Functions

// ============================================
// GENERIC FIRESTORE OPERATIONS
// ============================================

/**
 * Get all documents from a collection
 * @param {string} collectionName - Firestore collection name
 * @returns {Promise<Array>} - Array of documents
 */
async function getAllDocuments(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

/**
 * Get a single document by ID
 * @param {string} collectionName - Firestore collection name
 * @param {string} docId - Document ID
 * @returns {Promise<Object|null>} - Document data or null
 */
async function getDocumentById(collectionName, docId) {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document ${docId}:`, error);
    return null;
  }
}

/**
 * Create a new document
 * @param {string} collectionName - Firestore collection name
 * @param {Object} data - Document data
 * @param {string} customId - Optional custom ID (auto-generated if not provided)
 * @returns {Promise<Object>} - Created document with ID
 */
async function createDocument(collectionName, data, customId = null) {
  try {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const docData = {
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (customId) {
      await db.collection(collectionName).doc(customId).set(docData);
      return { id: customId, ...docData };
    } else {
      const docRef = await db.collection(collectionName).add(docData);
      return { id: docRef.id, ...docData };
    }
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update an existing document
 * @param {string} collectionName - Firestore collection name
 * @param {string} docId - Document ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<boolean>} - Success status
 */
async function updateDocument(collectionName, docId, updates) {
  try {
    await db.collection(collectionName).doc(docId).update({
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error(`Error updating document ${docId}:`, error);
    return false;
  }
}

/**
 * Delete a document
 * @param {string} collectionName - Firestore collection name
 * @param {string} docId - Document ID
 * @returns {Promise<boolean>} - Success status
 */
async function deleteDocument(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId}:`, error);
    return false;
  }
}

/**
 * Query documents with filters
 * @param {string} collectionName - Firestore collection name
 * @param {Array} filters - Array of [field, operator, value]
 * @param {Object} options - { orderBy, limit }
 * @returns {Promise<Array>} - Filtered documents
 */
async function queryDocuments(collectionName, filters = [], options = {}) {
  try {
    let query = db.collection(collectionName);
    
    // Apply filters
    filters.forEach(([field, operator, value]) => {
      query = query.where(field, operator, value);
    });
    
    // Apply ordering
    if (options.orderBy) {
      const [field, direction = 'asc'] = options.orderBy;
      query = query.orderBy(field, direction);
    }
    
    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    return [];
  }
}

/**
 * Listen to real-time changes in a collection
 * @param {string} collectionName - Firestore collection name
 * @param {Function} callback - Function to call with updated data
 * @param {Array} filters - Optional filters
 * @returns {Function} - Unsubscribe function
 */
function subscribeToCollection(collectionName, callback, filters = []) {
  let query = db.collection(collectionName);
  
  filters.forEach(([field, operator, value]) => {
    query = query.where(field, operator, value);
  });
  
  return query.onSnapshot((snapshot) => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(documents);
  }, (error) => {
    console.error(`Error in subscription to ${collectionName}:`, error);
  });
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Batch write multiple documents
 * @param {Array} operations - Array of {type, collection, id, data}
 * @returns {Promise<boolean>} - Success status
 */
async function batchWrite(operations) {
  try {
    const batch = db.batch();
    
    operations.forEach(op => {
      const docRef = db.collection(op.collection).doc(op.id);
      
      if (op.type === 'set') {
        batch.set(docRef, {
          ...op.data,
          updatedAt: new Date().toISOString()
        });
      } else if (op.type === 'update') {
        batch.update(docRef, {
          ...op.data,
          updatedAt: new Date().toISOString()
        });
      } else if (op.type === 'delete') {
        batch.delete(docRef);
      }
    });
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Batch write error:', error);
    return false;
  }
}

// ============================================
// SEED DATA FUNCTION
// ============================================

/**
 * Initialize database with seed data
 * Only runs if collections are empty
 */
async function seedDatabase() {
  try {
    // Check if data already exists
    const providersCount = await db.collection(COLLECTIONS.PROVIDERS).get();
    
    if (providersCount.size > 0) {
      console.log('Database already has data. Skipping seed.');
      return;
    }
    
    console.log('Seeding database with initial data...');
    
    // Seed Providers
    const providerPromises = PROVIDERS_DATA.map(provider =>
      createDocument(COLLECTIONS.PROVIDERS, provider, provider.id)
    );
    await Promise.all(providerPromises);
    console.log('✅ Providers seeded');
    
    // Seed Customers
    const customerPromises = CUSTOMERS_DATA.map(customer =>
      createDocument(COLLECTIONS.CUSTOMERS, customer, customer.id)
    );
    await Promise.all(customerPromises);
    console.log('✅ Customers seeded');
    
    // Seed Requests
    const requestPromises = REQUESTS_DATA.map(request =>
      createDocument(COLLECTIONS.REQUESTS, request, request.id)
    );
    await Promise.all(requestPromises);
    console.log('✅ Service requests seeded');
    
    // Seed Reviews
    const reviewPromises = REVIEWS_DATA.map(review =>
      createDocument(COLLECTIONS.REVIEWS, review, review.id)
    );
    await Promise.all(reviewPromises);
    console.log('✅ Reviews seeded');
    
    console.log('🎉 Database seeding completed!');
    alert('Database initialized with sample data!');
  } catch (error) {
    console.error('Error seeding database:', error);
    alert('Error initializing database. Check console for details.');
  }
}

// ============================================
// DATA MIGRATION UTILITIES
// ============================================

/**
 * Export Firestore data to JSON
 */
async function exportFirestoreData() {
  try {
    const data = {
      providers: await getAllDocuments(COLLECTIONS.PROVIDERS),
      customers: await getAllDocuments(COLLECTIONS.CUSTOMERS),
      requests: await getAllDocuments(COLLECTIONS.REQUESTS),
      reviews: await getAllDocuments(COLLECTIONS.REVIEWS),
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'firestore-export-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('✅ Data exported successfully');
  } catch (error) {
    console.error('Export error:', error);
  }
}

/**
 * Clear all collections (use with caution!)
 */
async function clearAllCollections() {
  if (!confirm('⚠️ This will delete ALL data. Are you absolutely sure?')) {
    return;
  }
  
  try {
    const collections = [
      COLLECTIONS.PROVIDERS,
      COLLECTIONS.CUSTOMERS,
      COLLECTIONS.REQUESTS,
      COLLECTIONS.REVIEWS
    ];
    
    for (const collection of collections) {
      const snapshot = await db.collection(collection).get();
      const batch = db.batch();
      
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`✅ Cleared ${collection}`);
    }
    
    alert('All data cleared successfully!');
  } catch (error) {
    console.error('Clear error:', error);
  }
}
