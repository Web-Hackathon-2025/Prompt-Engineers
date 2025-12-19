// users.js - User data store (customers, providers, and admin)

// Sample users with different roles and statuses
const users = [
  {
    id: 'user_001',
    role: 'customer',
    status: 'active', // pending, active, suspended
    name: 'Amit Sharma',
    email: 'amit@example.com',
    phone: '9876543210',
    location: 'Koramangala, Bangalore',
    registeredAt: '2025-12-10T10:00:00Z'
  },
  {
    id: 'user_002',
    role: 'customer',
    status: 'pending',
    name: 'Priya Mehta',
    email: 'priya@example.com',
    phone: '9876543211',
    location: 'Indiranagar, Bangalore',
    registeredAt: '2025-12-18T14:30:00Z'
  },
  {
    id: 'provider_001',
    role: 'provider',
    status: 'active',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '9876543220',
    location: 'Koramangala, Bangalore',
    registeredAt: '2025-12-08T09:00:00Z',
    // Provider-specific fields
    services: ['Plumbing', 'Electrical'],
    pricing: {
      'Plumbing': '₹500/hr',
      'Electrical': '₹600/hr'
    },
    availability: 'Mon-Sat, 9 AM - 6 PM',
    rating: 4.5,
    completedJobs: 47,
    bio: 'Experienced plumber and electrician with 10+ years in the field. Quick response and quality work guaranteed.'
  },
  {
    id: 'provider_002',
    role: 'provider',
    status: 'active',
    name: 'Sunita Devi',
    email: 'sunita@example.com',
    phone: '9876543221',
    location: 'Indiranagar, Bangalore',
    registeredAt: '2025-12-09T11:00:00Z',
    services: ['House Cleaning', 'Cooking'],
    pricing: {
      'House Cleaning': '₹400/session',
      'Cooking': '₹300/meal'
    },
    availability: 'Mon-Sun, 8 AM - 5 PM',
    rating: 4.8,
    completedJobs: 89,
    bio: 'Professional house cleaning and cooking services. Trusted by 50+ families in Bangalore.'
  },
  {
    id: 'provider_003',
    role: 'provider',
    status: 'pending',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    phone: '9876543222',
    location: 'Whitefield, Bangalore',
    registeredAt: '2025-12-19T08:00:00Z',
    services: ['Carpentry', 'Furniture Repair'],
    pricing: {
      'Carpentry': '₹700/hr',
      'Furniture Repair': '₹500/hr'
    },
    availability: 'Mon-Fri, 10 AM - 7 PM',
    rating: 0,
    completedJobs: 0,
    bio: 'Skilled carpenter ready to help with all your woodworking needs.'
  }
];

// Admin credentials (hardcoded for prototype)
const adminCredentials = {
  username: 'admin',
  password: 'karigar2025' // Simple password for demo
};

// Load users from localStorage or use sample data
function loadUsers() {
  const stored = localStorage.getItem('karigar_users');
  if (stored) {
    return JSON.parse(stored);
  }
  return [...users]; // Return copy of sample data
}

// Save users to localStorage
function saveUsers(userList) {
  localStorage.setItem('karigar_users', JSON.stringify(userList));
}

// Get user by ID
function getUserById(userId) {
  const userList = loadUsers();
  return userList.find(u => u.id === userId);
}

// Add new user
function addUser(userData) {
  const userList = loadUsers();
  const newUser = {
    id: `${userData.role}_${Date.now()}`,
    ...userData,
    status: 'pending', // All new users start as pending
    registeredAt: new Date().toISOString()
  };
  userList.push(newUser);
  saveUsers(userList);
  return newUser;
}

// Update user
function updateUser(userId, updates) {
  const userList = loadUsers();
  const index = userList.findIndex(u => u.id === userId);
  if (index !== -1) {
    userList[index] = { ...userList[index], ...updates };
    saveUsers(userList);
    return userList[index];
  }
  return null;
}

// Get users by role and status
function getUsersByRole(role, status = null) {
  const userList = loadUsers();
  let filtered = userList.filter(u => u.role === role);
  if (status) {
    filtered = filtered.filter(u => u.status === status);
  }
  return filtered;
}
