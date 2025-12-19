# Karigar – Hyperlocal Services Marketplace

## 👨‍💻 Team: Prompt-Engineers
Abdul Rehman, Saad, Sultan

## 🎯 Project Overview

**Karigar** is a web-based prototype for a hyperlocal services marketplace that connects customers with nearby service providers (plumbers, electricians, cleaners, tutors, etc.). Built for a Web + AI Hackathon, this application demonstrates clean code practices, meaningful AI integration, and a complete user workflow system.

## ✨ Features

### Customer Features
- Browse and search service providers by category and location
- View detailed provider profiles with services, pricing, and ratings
- Submit service requests to providers
- Track request status (requested → confirmed → completed/cancelled)
- Submit ratings and reviews after service completion

### Service Provider Features
- Create and manage service profiles
- Define services, pricing, and availability
- View incoming service requests
- Accept, reject, or reschedule requests
- View booking history and customer feedback

### Admin Features
- View lists of customers and providers
- Monitor and moderate reviews
- View AI-flagged issues (fake reviews, inappropriate content)
- System statistics dashboard

### AI Integration
- **Smart Matching:** Ranks service providers based on customer location, category, and ratings
- **Sentiment Analysis:** Analyzes reviews for inappropriate content and fake reviews
- **Profile Summarization:** Generates concise summaries of provider profiles

## 🏗️ Project Structure

```
Prompt-Engineers/
├── index.html           # Landing page with role selection
├── customer.html        # Customer dashboard
├── provider.html        # Service provider dashboard
├── admin.html           # Admin panel
├── style.css            # Global styling
├── script.js            # Core application logic
├── data/
│   ├── providers.js     # Mock provider data
│   └── requests.js      # Service request data structure
├── ai/
│   └── aiLogic.js       # AI logic (matching, sentiment, summarization)
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No backend server or database required

### Running Locally
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Select a role (Customer, Provider, or Admin) to explore different dashboards

### Deployment
This is a static site and can be deployed to:
- **Netlify:** Drag and drop the project folder
- **GitHub Pages:** Push to a repository and enable Pages
- **Vercel:** Import the project and deploy

## 📖 How to Use

### For Customers
1. Select "Customer" on the landing page
2. Browse providers by category or search by name/location
3. Click on a provider to view their profile
4. Submit a service request with details
5. Track your requests in "My Requests" section
6. Rate and review providers after service completion

### For Service Providers
1. Select "Service Provider" on the landing page
2. Create your profile (if new) or enter your provider ID
3. Add services, pricing, and set availability
4. View and manage incoming requests
5. Accept/reject requests and update their status
6. View your booking history

### For Admins
1. Select "Admin" on the landing page
2. View all users (customers and providers)
3. Monitor reviews and view AI-flagged content
4. Access system statistics

## 🤖 AI Logic Explanation

### 1. Smart Provider Matching
- **Input:** Customer's location and service category
- **Process:** 
  - Filters providers by category
  - Calculates distance score (simulated)
  - Weights by rating and availability
  - Returns ranked list
- **File:** `ai/aiLogic.js` → `matchProviders()`

### 2. Sentiment Analysis
- **Input:** Review text
- **Process:**
  - Detects negative keywords and profanity
  - Checks for spam patterns (repeated characters, all caps)
  - Analyzes review length and coherence
  - Returns sentiment score and flags
- **File:** `ai/aiLogic.js` → `analyzeReviewSentiment()`

### 3. Profile Summarization
- **Input:** Provider's full profile data
- **Process:**
  - Extracts key information (services, experience, rating)
  - Generates a concise 2-3 sentence summary
  - Highlights unique selling points
- **File:** `ai/aiLogic.js` → `generateProfileSummary()`

## 💾 Data Management

- **localStorage:** Persists user data, requests, and reviews across sessions
- **In-memory objects:** Stores current session state
- **Initial data:** Loaded from `data/providers.js` on first run
- **Data keys:**
  - `karigar_providers` – All service providers
  - `karigar_customers` – Customer profiles
  - `karigar_requests` – All service requests
  - `karigar_reviews` – Customer reviews

## 🎨 Design Principles

- **Clean & Intuitive:** Simple navigation and clear visual hierarchy
- **Responsive:** Works on desktop, tablet, and mobile devices
- **Accessible:** Proper contrast, readable fonts, semantic HTML
- **Status Indicators:** Color-coded badges for request states
- **Minimal Animations:** Subtle hover effects and transitions

## 🛠️ Technology Stack

- **HTML5:** Semantic markup
- **CSS3:** Flexbox, Grid, custom properties
- **Vanilla JavaScript (ES6+):** No frameworks or libraries
- **localStorage API:** Client-side data persistence

## 📝 Code Conventions

- **Modular functions:** Each function does one thing well
- **Clear naming:** Variables and functions use descriptive names
- **Comments:** Explain "why" not "what"
- **Constants:** Defined at the top of files
- **Error handling:** User-friendly messages

## 🔄 Request Workflow

1. **Customer submits request** → Status: "requested"
2. **Provider reviews** → Can accept or reject
3. **If accepted** → Status: "confirmed"
4. **Provider completes service** → Status: "completed"
5. **Customer can rate/review** → Review added to provider profile
6. **Alternative:** Provider/Customer can cancel → Status: "cancelled"

## 🏆 Hackathon Highlights

✅ **No frameworks:** Pure vanilla JavaScript  
✅ **Beginner-friendly:** Clean, readable, explainable code  
✅ **Meaningful AI:** Not just for show – solves real problems  
✅ **Complete workflow:** End-to-end user journey implemented  
✅ **Static deployment:** No backend required  
✅ **localStorage:** Data persists between sessions  

## 🤝 Contributing

This is a hackathon project designed for learning. Feel free to:
- Add new service categories
- Enhance the AI logic
- Improve the UI/UX
- Add more features

## 📄 License

This project is created for educational purposes as part of a university hackathon.

---

**Note:** This application uses simulated AI logic for demonstration purposes. In a production environment, these features would connect to actual AI/ML services or APIs.
