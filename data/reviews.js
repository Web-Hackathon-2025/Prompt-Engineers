// reviews.js - Review data store

// Sample reviews
const reviews = [
  {
    id: 'rev_001',
    requestId: 'req_003',
    customerId: 'user_001',
    providerId: 'provider_001',
    customerName: 'Amit Sharma',
    providerName: 'Rajesh Kumar',
    service: 'Electrical',
    rating: 5,
    comment: 'Excellent work! Rajesh was professional and completed the job quickly. Highly recommend.',
    createdAt: '2025-12-18T18:00:00Z',
    sentiment: 'positive', // positive, neutral, negative
    flagged: false // Set by AI if inappropriate content detected
  },
  {
    id: 'rev_002',
    requestId: 'req_001',
    customerId: 'user_001',
    providerId: 'provider_002',
    customerName: 'Amit Sharma',
    providerName: 'Sunita Devi',
    service: 'House Cleaning',
    rating: 5,
    comment: 'Very thorough cleaning. Sunita is reliable and trustworthy. Will book again.',
    createdAt: '2025-12-10T16:00:00Z',
    sentiment: 'positive',
    flagged: false
  }
];

// Load reviews from localStorage or use sample data
function loadReviews() {
  const stored = localStorage.getItem('karigar_reviews');
  if (stored) {
    return JSON.parse(stored);
  }
  return [...reviews];
}

// Save reviews to localStorage
function saveReviews(reviewList) {
  localStorage.setItem('karigar_reviews', JSON.stringify(reviewList));
}

// Get review by ID
function getReviewById(reviewId) {
  const reviewList = loadReviews();
  return reviewList.find(r => r.id === reviewId);
}

// Add new review
function addReview(reviewData) {
  const reviewList = loadReviews();
  const newReview = {
    id: `rev_${Date.now()}`,
    ...reviewData,
    createdAt: new Date().toISOString(),
    sentiment: 'neutral', // Will be analyzed by AI
    flagged: false
  };
  reviewList.push(newReview);
  saveReviews(reviewList);
  return newReview;
}

// Update review (for moderation)
function updateReview(reviewId, updates) {
  const reviewList = loadReviews();
  const index = reviewList.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviewList[index] = { ...reviewList[index], ...updates };
    saveReviews(reviewList);
    return reviewList[index];
  }
  return null;
}

// Get reviews by provider
function getReviewsByProvider(providerId) {
  const reviewList = loadReviews();
  return reviewList.filter(r => r.providerId === providerId);
}

// Get reviews by customer
function getReviewsByCustomer(customerId) {
  const reviewList = loadReviews();
  return reviewList.filter(r => r.customerId === customerId);
}

// Get flagged reviews
function getFlaggedReviews() {
  const reviewList = loadReviews();
  return reviewList.filter(r => r.flagged === true);
}

// Calculate average rating for a provider
function getProviderAverageRating(providerId) {
  const providerReviews = getReviewsByProvider(providerId);
  if (providerReviews.length === 0) return 0;
  const sum = providerReviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / providerReviews.length).toFixed(1);
}
