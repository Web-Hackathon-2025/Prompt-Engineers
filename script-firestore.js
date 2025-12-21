// script.js - FIRESTORE VERSION
// Core Application Logic with Firebase Firestore Integration
// Replaces localStorage with cloud database

// ============================================
// DATA GETTERS (Now Async with Firestore)
// ============================================

async function getAllProviders() {
  return await getAllDocuments(COLLECTIONS.PROVIDERS);
}

async function getProviderById(providerId) {
  return await getDocumentById(COLLECTIONS.PROVIDERS, providerId);
}

async function getProvidersByCategory(category) {
  return await queryDocuments(
    COLLECTIONS.PROVIDERS,
    [
      ['category', '==', category],
      ['status', '==', 'active']
    ]
  );
}

async function getAllRequests() {
  return await getAllDocuments(COLLECTIONS.REQUESTS);
}

async function getRequestById(requestId) {
  return await getDocumentById(COLLECTIONS.REQUESTS, requestId);
}

async function getRequestsByCustomer(customerId) {
  const requests = await queryDocuments(
    COLLECTIONS.REQUESTS,
    [['customerId', '==', customerId]],
    { orderBy: ['createdAt', 'desc'] }
  );
  return requests;
}

async function getRequestsByProvider(providerId) {
  const requests = await queryDocuments(
    COLLECTIONS.REQUESTS,
    [['providerId', '==', providerId]],
    { orderBy: ['createdAt', 'desc'] }
  );
  return requests;
}

async function getAllReviews() {
  return await getAllDocuments(COLLECTIONS.REVIEWS);
}

async function getReviewsByProvider(providerId) {
  const reviews = await queryDocuments(
    COLLECTIONS.REVIEWS,
    [['providerId', '==', providerId]],
    { orderBy: ['createdAt', 'desc'] }
  );
  return reviews;
}

async function getReviewsByCustomer(customerId) {
  return await queryDocuments(
    COLLECTIONS.REVIEWS,
    [['customerId', '==', customerId]]
  );
}

async function getAllCustomers() {
  return await getAllDocuments(COLLECTIONS.CUSTOMERS);
}

async function getCustomerById(customerId) {
  return await getDocumentById(COLLECTIONS.CUSTOMERS, customerId);
}

// ============================================
// DATA SETTERS (CREATE/UPDATE/DELETE)
// ============================================

async function updateProvider(providerId, updates) {
  return await updateDocument(COLLECTIONS.PROVIDERS, providerId, updates);
}

async function createRequest(requestData) {
  const newRequest = {
    id: 'r' + Date.now(),
    ...requestData,
    status: 'requested',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await createDocument(COLLECTIONS.REQUESTS, newRequest, newRequest.id);
  return newRequest;
}

async function updateRequest(requestId, updates) {
  return await updateDocument(COLLECTIONS.REQUESTS, requestId, updates);
}

async function createReview(reviewData) {
  const newReview = {
    id: 'rev' + Date.now(),
    ...reviewData,
    createdAt: new Date().toISOString(),
    flagged: false,
    moderationNotes: null
  };
  
  await createDocument(COLLECTIONS.REVIEWS, newReview, newReview.id);
  
  // Update provider's rating
  await updateProviderRating(reviewData.providerId);
  
  return newReview;
}

async function updateReview(reviewId, updates) {
  return await updateDocument(COLLECTIONS.REVIEWS, reviewId, updates);
}

async function updateProviderRating(providerId) {
  const reviews = await getReviewsByProvider(providerId);
  if (reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await updateProvider(providerId, {
      rating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length
    });
  }
}

// ============================================
// USER SESSION MANAGEMENT
// ============================================

function setCurrentUser(user) {
  localStorage.setItem('karigar_current_user', JSON.stringify(user));
}

function getCurrentUser() {
  const data = localStorage.getItem('karigar_current_user');
  return data ? JSON.parse(data) : null;
}

function logout() {
  localStorage.removeItem('karigar_current_user');
  
  // Sign out from Firebase Auth if logged in
  if (auth && auth.currentUser) {
    auth.signOut();
  }
  
  window.location.href = 'index.html';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-IN', options);
}

function generateId(prefix) {
  return prefix + Date.now() + Math.random().toString(36).substr(2, 9);
}

function getStatusClass(status) {
  const statusClasses = {
    'requested': 'status-requested',
    'confirmed': 'status-confirmed',
    'rejected': 'status-rejected',
    'completed': 'status-completed',
    'cancelled': 'status-cancelled',
    'active': 'status-active',
    'suspended': 'status-suspended',
    'pending': 'status-pending'
  };
  return statusClasses[status] || 'status-default';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

async function searchProviders(query) {
  const providers = await getAllProviders();
  const lowerQuery = query.toLowerCase();
  return providers.filter(p => 
    p.status === 'active' && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.services.some(s => s.toLowerCase().includes(lowerQuery)) ||
      p.location.area.toLowerCase().includes(lowerQuery)
    )
  );
}

function filterProvidersByLocation(providers, userLat, userLon, radiusKm = 10) {
  return providers.filter(p => {
    const distance = calculateDistance(
      userLat, 
      userLon, 
      p.location.latitude, 
      p.location.longitude
    );
    return distance <= radiusKm;
  });
}

async function getPlatformStats() {
  const providers = await getAllProviders();
  const requests = await getAllRequests();
  const reviews = await getAllReviews();
  const customers = await getAllCustomers();
  
  return {
    totalProviders: providers.length,
    activeProviders: providers.filter(p => p.status === 'active').length,
    suspendedProviders: providers.filter(p => p.status === 'suspended').length,
    pendingProviders: providers.filter(p => p.status === 'pending').length,
    totalCustomers: customers.length,
    totalRequests: requests.length,
    requestedCount: requests.filter(r => r.status === 'requested').length,
    confirmedCount: requests.filter(r => r.status === 'confirmed').length,
    completedCount: requests.filter(r => r.status === 'completed').length,
    rejectedCount: requests.filter(r => r.status === 'rejected').length,
    cancelledCount: requests.filter(r => r.status === 'cancelled').length,
    totalReviews: reviews.length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0,
    flaggedReviews: reviews.filter(r => r.flagged).length
  };
}

async function canReviewRequest(requestId, customerId) {
  const request = await getRequestById(requestId);
  if (!request || request.status !== 'completed' || request.customerId !== customerId) {
    return false;
  }
  
  const reviews = await getAllReviews();
  const existingReview = reviews.find(r => r.requestId === requestId);
  return !existingReview;
}

// ============================================
// REAL-TIME UPDATES (Optional)
// ============================================

/**
 * Subscribe to real-time provider updates
 * @param {Function} callback - Function to call with updated providers
 * @returns {Function} - Unsubscribe function
 */
function subscribeToProviders(callback) {
  return subscribeToCollection(COLLECTIONS.PROVIDERS, callback);
}

/**
 * Subscribe to user's requests in real-time
 * @param {string} userId - User ID (customer or provider)
 * @param {string} userType - 'customer' or 'provider'
 * @param {Function} callback - Function to call with updated requests
 * @returns {Function} - Unsubscribe function
 */
function subscribeToUserRequests(userId, userType, callback) {
  const field = userType === 'customer' ? 'customerId' : 'providerId';
  return subscribeToCollection(
    COLLECTIONS.REQUESTS,
    callback,
    [[field, '==', userId]]
  );
}

/**
 * Subscribe to provider reviews in real-time
 * @param {string} providerId - Provider ID
 * @param {Function} callback - Function to call with updated reviews
 * @returns {Function} - Unsubscribe function
 */
function subscribeToProviderReviews(providerId, callback) {
  return subscribeToCollection(
    COLLECTIONS.REVIEWS,
    callback,
    [['providerId', '==', providerId]]
  );
}

// ============================================
// LOADING STATES
// ============================================

function showLoading(message = 'Loading...') {
  const loader = document.getElementById('globalLoader');
  if (loader) {
    loader.style.display = 'flex';
    const msg = loader.querySelector('.loading-message');
    if (msg) msg.textContent = message;
  }
}

function hideLoading() {
  const loader = document.getElementById('globalLoader');
  if (loader) {
    loader.style.display = 'none';
  }
}

// ============================================
// ERROR HANDLING
// ============================================

function handleError(error, context = '') {
  console.error(`Error in ${context}:`, error);
  alert(`An error occurred: ${error.message || 'Unknown error'}. Please try again.`);
  hideLoading();
}

// ============================================
// INITIALIZATION
// ============================================

// Auto-seed database on first load (only if using seed data files)
window.addEventListener('load', async () => {
  // Wait for Firebase to initialize
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if we should seed the database
  if (typeof PROVIDERS_DATA !== 'undefined' && window.location.pathname.includes('index.html')) {
    const providers = await getAllProviders();
    if (providers.length === 0) {
      if (confirm('Database is empty. Would you like to load sample data?')) {
        await seedDatabase();
      }
    }
  }
});
