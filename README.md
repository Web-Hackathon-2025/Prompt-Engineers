# 🛠️ Karigar - Service Provider Marketplace

**Built for Web + AI Hackathon 2025**

A modern, production-ready service marketplace connecting customers with local service providers in Pakistan.

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore + Authentication)
- **Database**: Cloud Firestore (NoSQL)
- **Authentication**: Firebase Auth (Email/Password + Google Sign-In)
- **Hosting**: Ready for Firebase Hosting

## 📁 Project Structure

```
Karigar/
├── index.html              # Landing page
├── login.html              # Authentication page (Login/Signup)
├── customer.html           # Customer dashboard
├── provider.html           # Provider dashboard
├── admin.html              # Admin dashboard
├── style.css               # Global styles
├── firebase-config.js      # Firebase configuration
├── firebase-auth.js        # Authentication utilities
├── db-utils.js             # Database CRUD operations
├── script-firestore.js     # Core application logic
├── firestore.rules         # Database security rules (testing)
└── firestore.rules.production  # Production security rules
```

## 🔥 Firebase Collections

- **users**: User profiles (all roles)
- **customers**: Customer-specific data
- **providers**: Provider profiles and services
- **service_requests**: Service booking requests
- **reviews**: Customer reviews and ratings

## 🎯 Features

### For Customers
- Browse service providers by category and location
- View ratings and reviews
- Submit service requests
- Track booking status
- Leave feedback

### For Providers
- Create professional profile
- Manage service offerings
- Accept/reject booking requests
- Build reputation through reviews
- Track completed jobs

### For Admins
- User management (approve/suspend accounts)
- Service request oversight
- Platform monitoring
- Content moderation

## 🔐 Admin Access

To register as an admin, use the secret code: `KARIGAR_ADMIN_2025`

## 🚀 Getting Started

1. **Configure Firebase**:
   - Update `firebase-config.js` with your Firebase project credentials

2. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Open the Project**:
   - Open `index.html` in a browser
   - Or use Live Server extension in VS Code

4. **Test Authentication**:
   - Go to login.html
   - Sign up with a new account (Customer/Provider/Admin)
   - Test Firebase authentication

## 📝 Notes

- Security rules are currently in testing mode (allow all)
- For production, deploy `firestore.rules.production`
- All user data is stored in Firebase Firestore
- No localStorage or local data files

## 🎨 Design

- Modern gradient UI (Purple & Teal color scheme)
- Responsive design for mobile and desktop
- Clean, professional interface
- Smooth animations and transitions

## 📄 License

Built for educational purposes - Web + AI Hackathon 2025

---

Made with ❤️ by Prompt Engineers
