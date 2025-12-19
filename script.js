// script.js - Core utility functions and shared logic

// ===== SESSION MANAGEMENT =====

// Set current user in session
function setCurrentUser(user) {
  sessionStorage.setItem('karigar_current_user', JSON.stringify(user));
}

// Get current user from session
function getCurrentUser() {
  const user = sessionStorage.getItem('karigar_current_user');
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Logout current user
function logout() {
  sessionStorage.removeItem('karigar_current_user');
  sessionStorage.removeItem('karigar_admin_auth');
  window.location.href = 'index.html';
}

// Check admin authentication
function isAdminAuthenticated() {
  return sessionStorage.getItem('karigar_admin_auth') === 'true';
}

// Set admin authentication
function setAdminAuth() {
  sessionStorage.setItem('karigar_admin_auth', 'true');
}

// Protect admin page
function protectAdminPage() {
  if (!isAdminAuthenticated()) {
    window.location.href = 'admin-login.html';
  }
}

// ===== UI HELPERS =====

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '400px';
  notification.style.animation = 'slideIn 0.3s ease';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add slide animations dynamically
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-PK', options);
}

// Format date only (no time)
function formatDateOnly(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  return date.toLocaleDateString('en-PK', options);
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let html = '<div class="rating">';
  
  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star">★</span>';
  }
  
  if (halfStar) {
    html += '<span class="star">★</span>';
  }
  
  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star empty">★</span>';
  }
  
  html += `<span style="margin-left: 0.5rem; color: var(--text-medium);">(${rating})</span>`;
  html += '</div>';
  
  return html;
}

// Get status badge HTML
function getStatusBadge(status) {
  const badges = {
    'active': '<span class="badge badge-success">Active</span>',
    'pending': '<span class="badge badge-warning">Pending</span>',
    'suspended': '<span class="badge badge-danger">Suspended</span>',
    'pending_admin': '<span class="badge badge-warning">Awaiting Admin</span>',
    'requested': '<span class="badge badge-info">Requested</span>',
    'confirmed': '<span class="badge badge-success">Confirmed</span>',
    'completed': '<span class="badge badge-success">Completed</span>',
    'cancelled': '<span class="badge badge-danger">Cancelled</span>'
  };
  return badges[status] || `<span class="badge badge-secondary">${status}</span>`;
}

// ===== MODAL HELPERS =====

// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// ===== TAB HELPERS =====

// Initialize tabs
function initializeTabs(tabContainerId) {
  const container = document.getElementById(tabContainerId);
  if (!container) return;
  
  const tabs = container.querySelectorAll('.tab');
  const contents = container.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ===== VALIDATION HELPERS =====

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone (Pakistani format: 03XXXXXXXXX)
function isValidPhone(phone) {
  const re = /^03\d{9}$/;
  return re.test(phone);
}

// ===== SEARCH & FILTER HELPERS =====

// Filter items by search query
function filterItems(items, query, fields) {
  if (!query) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(item => {
    return fields.some(field => {
      const value = getNestedValue(item, field);
      return value && value.toString().toLowerCase().includes(lowerQuery);
    });
  });
}

// Get nested object value by path
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

// ===== LOCATION HELPERS =====

// Calculate simple distance match (for prototype - checks if locations match)
function isLocationMatch(location1, location2) {
  if (!location1 || !location2) return false;
  
  const loc1 = location1.toLowerCase();
  const loc2 = location2.toLowerCase();
  
  // Extract area name (first word/phrase before comma)
  const area1 = loc1.split(',')[0].trim();
  const area2 = loc2.split(',')[0].trim();
  
  return area1 === area2 || loc1.includes(area2) || loc2.includes(area1);
}

// ===== LOCAL STORAGE HELPERS =====

// Get item from localStorage with fallback
function getStorageItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

// Set item in localStorage
function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
}

// ===== INITIALIZATION =====

// Initialize common page features
document.addEventListener('DOMContentLoaded', () => {
  // Add logout button functionality if exists
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        logout();
      }
    });
  }
  
  // Initialize all tab containers
  const tabContainers = document.querySelectorAll('[data-tabs]');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  });
});
