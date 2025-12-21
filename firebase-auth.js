// firebase-auth.js
// Firebase Authentication Helper Functions

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

/**
 * Sign up a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} userData - Additional user data (name, role, etc.)
 * @returns {Promise<Object>} - User object
 */
async function signUpUser(email, password, userData) {
  try {
    // Create Firebase Auth user
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update display name
    if (userData.name) {
      await user.updateProfile({ displayName: userData.name });
    }
    
    // Save additional user data to Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      name: userData.name || '',
      role: userData.role || 'customer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    };
    
    // Save to appropriate collection based on role
    if (userData.role === 'provider') {
      await createDocument(COLLECTIONS.PROVIDERS, userDoc, user.uid);
    } else if (userData.role === 'customer') {
      await createDocument(COLLECTIONS.CUSTOMERS, userDoc, user.uid);
    }
    
    // Create user profile document
    await createDocument(COLLECTIONS.USERS, {
      uid: user.uid,
      email: user.email,
      role: userData.role,
      createdAt: new Date().toISOString()
    }, user.uid);
    
    console.log('✅ User registered successfully');
    return userDoc;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign in existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User object
 */
async function signInUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDocumentById(COLLECTIONS.USERS, user.uid);
    
    if (!userDoc) {
      throw new Error('User profile not found');
    }
    
    // Get role-specific data
    let userData = null;
    if (userDoc.role === 'provider') {
      userData = await getDocumentById(COLLECTIONS.PROVIDERS, user.uid);
    } else if (userDoc.role === 'customer') {
      userData = await getDocumentById(COLLECTIONS.CUSTOMERS, user.uid);
    }
    
    const fullUserData = {
      uid: user.uid,
      email: user.email,
      role: userDoc.role,
      ...userData
    };
    
    // Store in localStorage for session
    setCurrentUser(fullUserData);
    
    console.log('✅ Signed in successfully');
    return fullUserData;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign out current user
 */
async function signOutUser() {
  try {
    await auth.signOut();
    localStorage.removeItem('karigar_current_user');
    console.log('✅ Signed out successfully');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 */
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    alert('Password reset email sent! Please check your inbox.');
  } catch (error) {
    console.error('Password reset error:', error);
    alert('Error sending reset email: ' + error.message);
  }
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Function to call with user data
 */
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in
      const userDoc = await getDocumentById(COLLECTIONS.USERS, user.uid);
      
      if (userDoc) {
        let userData = null;
        if (userDoc.role === 'provider') {
          userData = await getDocumentById(COLLECTIONS.PROVIDERS, user.uid);
        } else if (userDoc.role === 'customer') {
          userData = await getDocumentById(COLLECTIONS.CUSTOMERS, user.uid);
        }
        
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          role: userDoc.role,
          ...userData
        };
        
        callback(fullUserData);
      } else {
        callback(null);
      }
    } else {
      // User is signed out
      callback(null);
    }
  });
}

/**
 * Get current authenticated user
 * @returns {Object|null} - Current user or null
 */
function getCurrentAuthUser() {
  return auth.currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
function isAuthenticated() {
  return auth.currentUser !== null;
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Profile updates
 * @param {string} role - User role (provider or customer)
 */
async function updateUserProfile(userId, updates, role) {
  try {
    const collection = role === 'provider' ? COLLECTIONS.PROVIDERS : COLLECTIONS.CUSTOMERS;
    await updateDocument(collection, userId, updates);
    
    // Update auth profile if name changed
    if (updates.name && auth.currentUser) {
      await auth.currentUser.updateProfile({ displayName: updates.name });
    }
    
    console.log('✅ Profile updated successfully');
    return true;
  } catch (error) {
    console.error('Profile update error:', error);
    return false;
  }
}

// ============================================
// GOOGLE SIGN IN (Optional Enhancement)
// ============================================

/**
 * Sign in with Google
 */
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    // Check if user exists
    let userDoc = await getDocumentById(COLLECTIONS.USERS, user.uid);
    
    if (!userDoc) {
      // New user - create profile
      const role = prompt('Are you a Customer or Provider?', 'customer').toLowerCase();
      
      userDoc = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        role: role,
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString()
      };
      
      await createDocument(COLLECTIONS.USERS, userDoc, user.uid);
      
      // Create role-specific document
      if (role === 'provider') {
        await createDocument(COLLECTIONS.PROVIDERS, {
          ...userDoc,
          category: 'General',
          services: [],
          status: 'pending'
        }, user.uid);
      } else {
        await createDocument(COLLECTIONS.CUSTOMERS, userDoc, user.uid);
      }
    }
    
    setCurrentUser(userDoc);
    console.log('✅ Signed in with Google successfully');
    return userDoc;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

// ============================================
// EMAIL VERIFICATION
// ============================================

/**
 * Send email verification
 */
async function sendEmailVerification() {
  try {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
      alert('Verification email sent! Please check your inbox.');
    }
  } catch (error) {
    console.error('Email verification error:', error);
  }
}

/**
 * Check if email is verified
 * @returns {boolean} - Verification status
 */
function isEmailVerified() {
  const user = auth.currentUser;
  return user ? user.emailVerified : false;
}
