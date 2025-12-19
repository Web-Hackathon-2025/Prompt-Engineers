// aiLogic.js - AI-powered features for Karigar platform
// This file demonstrates meaningful AI integration for a hackathon prototype

/* =====================================================
   AI FEATURE 1: PROVIDER RANKING & RECOMMENDATION
   ===================================================== */

/**
 * Rank and sort service providers based on multiple factors
 * Uses a scoring algorithm to determine best matches for customers
 * 
 * Scoring factors:
 * - Location match (30 points)
 * - Service match (25 points)
 * - Rating (20 points)
 * - Completed jobs (15 points)
 * - Recency of activity (10 points)
 */
function rankProviders(providers, customerLocation, requestedService) {
  // Calculate score for each provider
  const scoredProviders = providers.map(provider => {
    let score = 0;
    
    // Location scoring (0-30 points)
    if (isLocationMatch(provider.location, customerLocation)) {
      score += 30;
    } else {
      // Partial match for same city
      const providerCity = provider.location.split(',').pop().trim().toLowerCase();
      const customerCity = customerLocation.split(',').pop().trim().toLowerCase();
      if (providerCity === customerCity) {
        score += 15;
      }
    }
    
    // Service match scoring (0-25 points)
    if (requestedService && provider.services) {
      if (provider.services.includes(requestedService)) {
        score += 25;
      } else {
        // Check for related services
        const relatedServices = getRelatedServices(requestedService);
        const hasRelated = provider.services.some(s => relatedServices.includes(s));
        if (hasRelated) {
          score += 10;
        }
      }
    } else if (!requestedService) {
      // No specific service requested, give neutral score
      score += 12;
    }
    
    // Rating scoring (0-20 points)
    const rating = provider.rating || 0;
    score += (rating / 5) * 20;
    
    // Completed jobs scoring (0-15 points)
    const completedJobs = provider.completedJobs || 0;
    if (completedJobs >= 50) {
      score += 15;
    } else if (completedJobs >= 20) {
      score += 12;
    } else if (completedJobs >= 10) {
      score += 8;
    } else if (completedJobs >= 5) {
      score += 5;
    } else if (completedJobs > 0) {
      score += 2;
    }
    
    // Activity recency scoring (0-10 points)
    const registeredDate = new Date(provider.registeredAt);
    const daysSinceRegistration = (new Date() - registeredDate) / (1000 * 60 * 60 * 24);
    if (daysSinceRegistration < 30) {
      score += 10; // New providers get a boost
    } else if (daysSinceRegistration < 90) {
      score += 8;
    } else if (daysSinceRegistration < 180) {
      score += 5;
    } else {
      score += 3;
    }
    
    return {
      ...provider,
      aiScore: Math.round(score)
    };
  });
  
  // Sort by score (highest first)
  return scoredProviders.sort((a, b) => b.aiScore - a.aiScore);
}

/**
 * Get related services for broader matching
 */
function getRelatedServices(service) {
  const serviceMap = {
    'Plumbing': ['Electrical', 'AC Repair'],
    'Electrical': ['Plumbing', 'Appliance Repair', 'AC Repair'],
    'Carpentry': ['Furniture Repair', 'Painting'],
    'Painting': ['Carpentry', 'House Cleaning'],
    'House Cleaning': ['Cooking', 'Painting'],
    'Cooking': ['House Cleaning'],
    'AC Repair': ['Electrical', 'Appliance Repair'],
    'Appliance Repair': ['Electrical', 'AC Repair']
  };
  
  return serviceMap[service] || [];
}

/* =====================================================
   AI FEATURE 2: PROVIDER PROFILE SUMMARY
   ===================================================== */

/**
 * Generate a concise, human-readable summary of a provider's profile
 * Uses natural language generation to highlight key strengths
 */
function generateProviderSummary(provider) {
  const parts = [];
  
  // Experience level
  const completedJobs = provider.completedJobs || 0;
  if (completedJobs >= 50) {
    parts.push('Highly experienced professional');
  } else if (completedJobs >= 20) {
    parts.push('Experienced service provider');
  } else if (completedJobs >= 10) {
    parts.push('Established provider');
  } else if (completedJobs > 0) {
    parts.push('Growing service provider');
  } else {
    parts.push('New to the platform');
  }
  
  // Rating mention
  const rating = provider.rating || 0;
  if (rating >= 4.5) {
    parts.push('with excellent customer ratings');
  } else if (rating >= 4.0) {
    parts.push('with strong customer satisfaction');
  } else if (rating >= 3.5) {
    parts.push('with good customer feedback');
  }
  
  // Service specialization
  if (provider.services && provider.services.length > 0) {
    if (provider.services.length === 1) {
      parts.push(`specializing in ${provider.services[0]}`);
    } else if (provider.services.length === 2) {
      parts.push(`offering ${provider.services[0]} and ${provider.services[1]}`);
    } else {
      parts.push(`offering ${provider.services.length} different services`);
    }
  }
  
  // Location advantage
  if (provider.location) {
    const area = provider.location.split(',')[0].trim();
    parts.push(`serving ${area} area`);
  }
  
  // Combine parts into a sentence
  if (parts.length === 0) return '';
  
  let summary = parts[0];
  for (let i = 1; i < parts.length; i++) {
    if (i === parts.length - 1 && parts.length > 2) {
      summary += ', and ' + parts[i];
    } else if (i === parts.length - 1) {
      summary += ' ' + parts[i];
    } else {
      summary += ', ' + parts[i];
    }
  }
  
  return summary + '.';
}

/* =====================================================
   AI FEATURE 3: REVIEW SENTIMENT ANALYSIS
   ===================================================== */

/**
 * Analyze sentiment of review text
 * Returns sentiment (positive/neutral/negative) and flags inappropriate content
 */
function analyzeSentiment(reviewText) {
  if (!reviewText) {
    return { sentiment: 'neutral', flagged: false };
  }
  
  const text = reviewText.toLowerCase();
  
  // Check for inappropriate content first
  const inappropriateWords = [
    'hate', 'stupid', 'idiot', 'worst', 'terrible', 'horrible',
    'scam', 'cheat', 'fraud', 'fake', 'disgusting'
  ];
  
  const hasFlaggedContent = inappropriateWords.some(word => text.includes(word));
  
  // Define sentiment keywords
  const positiveWords = [
    'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'perfect',
    'good', 'best', 'love', 'loved', 'happy', 'satisfied', 'impressed',
    'professional', 'reliable', 'trustworthy', 'recommend', 'quality',
    'efficient', 'quick', 'helpful', 'friendly', 'skilled', 'expert',
    'superb', 'outstanding', 'exceptional', 'brilliant'
  ];
  
  const negativeWords = [
    'bad', 'poor', 'disappointed', 'unsatisfied', 'unhappy', 'wrong',
    'late', 'delayed', 'missed', 'rude', 'unprofessional', 'careless',
    'incomplete', 'broken', 'damaged', 'issue', 'problem', 'complaint',
    'never', 'don\'t', 'didn\'t', 'won\'t', 'wasn\'t', 'aren\'t'
  ];
  
  // Count positive and negative words
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    const matches = text.match(regex);
    if (matches) {
      positiveCount += matches.length;
    }
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    const matches = text.match(regex);
    if (matches) {
      negativeCount += matches.length;
    }
  });
  
  // Determine sentiment
  let sentiment;
  const sentimentScore = positiveCount - negativeCount;
  
  if (sentimentScore > 1) {
    sentiment = 'positive';
  } else if (sentimentScore < -1) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  // Additional context clues
  if (text.includes('highly recommend') || text.includes('will use again') || text.includes('5 star')) {
    sentiment = 'positive';
  }
  
  if (text.includes('never again') || text.includes('do not recommend') || text.includes('waste of')) {
    sentiment = 'negative';
  }
  
  return {
    sentiment: sentiment,
    flagged: hasFlaggedContent,
    positiveCount: positiveCount,
    negativeCount: negativeCount
  };
}

/* =====================================================
   AI FEATURE 4: REQUEST PRIORITY SCORING
   ===================================================== */

/**
 * Score service requests to help admin prioritize approvals
 * Higher scores indicate requests that should be approved first
 */
function scoreRequestPriority(request, customerHistory, providerHistory) {
  let score = 50; // Base score
  
  // Customer history factor (0-20 points)
  if (customerHistory) {
    const completedRequests = customerHistory.filter(r => r.status === 'completed').length;
    const cancelledRequests = customerHistory.filter(r => r.status === 'cancelled').length;
    
    if (completedRequests > 5) {
      score += 20;
    } else if (completedRequests > 2) {
      score += 15;
    } else if (completedRequests > 0) {
      score += 10;
    }
    
    // Penalty for cancellations
    if (cancelledRequests > 3) {
      score -= 10;
    } else if (cancelledRequests > 1) {
      score -= 5;
    }
  }
  
  // Provider quality factor (0-20 points)
  if (providerHistory) {
    const completedRequests = providerHistory.filter(r => r.status === 'completed').length;
    const avgRating = 4.2; // Placeholder - would calculate from reviews
    
    if (completedRequests > 20) {
      score += 15;
    } else if (completedRequests > 10) {
      score += 10;
    } else if (completedRequests > 5) {
      score += 5;
    }
    
    if (avgRating >= 4.5) {
      score += 5;
    }
  }
  
  // Urgency factor (0-10 points)
  const requestDate = new Date(request.preferredDate);
  const today = new Date();
  const daysUntil = Math.ceil((requestDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntil <= 1) {
    score += 10;
  } else if (daysUntil <= 3) {
    score += 7;
  } else if (daysUntil <= 7) {
    score += 4;
  }
  
  return Math.min(100, Math.max(0, score)); // Clamp between 0-100
}

/* =====================================================
   AI FEATURE 5: SMART SEARCH SUGGESTIONS
   ===================================================== */

/**
 * Generate search suggestions based on user query
 * Helps users find what they're looking for faster
 */
function generateSearchSuggestions(query, providers) {
  const suggestions = [];
  const queryLower = query.toLowerCase();
  
  // Service suggestions
  const allServices = new Set();
  providers.forEach(p => {
    if (p.services) {
      p.services.forEach(s => allServices.add(s));
    }
  });
  
  allServices.forEach(service => {
    if (service.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'service',
        text: service,
        icon: '🔧'
      });
    }
  });
  
  // Location suggestions
  const locations = new Set();
  providers.forEach(p => {
    if (p.location) {
      const area = p.location.split(',')[0].trim();
      locations.add(area);
    }
  });
  
  locations.forEach(location => {
    if (location.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'location',
        text: location,
        icon: '📍'
      });
    }
  });
  
  // Provider name suggestions
  providers.forEach(provider => {
    if (provider.name.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'provider',
        text: provider.name,
        icon: '👤'
      });
    }
  });
  
  return suggestions.slice(0, 5); // Return top 5
}

/* =====================================================
   EXPORT NOTE
   ===================================================== */

// All functions are available globally for use in HTML files
// No module exports needed for vanilla JS prototype

console.log('✅ AI Logic Module Loaded - Karigar Platform');
console.log('📊 Available AI Features:');
console.log('  - rankProviders(): Smart provider ranking');
console.log('  - generateProviderSummary(): Auto-generated summaries');
console.log('  - analyzeSentiment(): Review sentiment analysis');
console.log('  - scoreRequestPriority(): Request prioritization');
console.log('  - generateSearchSuggestions(): Smart search');
