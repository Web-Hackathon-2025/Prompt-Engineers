# 🛠️ Karigar - Service Provider Marketplace

**Built for WebHackathon 2025 by Prompt Engineers**

A premium 3D-styled service marketplace connecting customers with local service providers in Pakistan. Features a modern glass-morphism design with smooth animations and transitions.

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore + Authentication)
- **Database**: Cloud Firestore (NoSQL)
- **Authentication**: Firebase Auth (Email/Password + Google Sign-In)
- **Hosting**: Ready for Firebase Hosting
- **Design**: Premium 3D UI with glass-morphism effects

## 📁 Project Structure

```
Karigar/
├── start-here.html         # 🚀 Entry point - Start here!
├── index-3d.html           # Landing page with 3D hero
├── login-3d.html           # Authentication (Login/Signup)
├── customer-3d.html        # Customer dashboard
├── provider-3d.html        # Provider dashboard  
├── admin-3d.html           # Admin dashboard
├── style-3d.css            # 3D design system & global styles
├── page-transitions.js     # Page transition animations
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

**Login as Admin:**
1. Go to **Login** page
2. Click the **Admin** role option (🔐 icon)
3. Enter admin code: `KARIGAR_ADMIN_2025`
4. Use your admin email and password to login

**Register as Admin:**
1. Go to **Sign Up** tab
2. Select the **Admin** role (🔐 icon)
3. Enter admin code: `KARIGAR_ADMIN_2025`
4. Fill in your details and create account

## 🚀 Getting Started

1. **Start the App**:
   - Open `start-here.html` in a browser
   - Or use Live Server extension in VS Code

2. **Configure Firebase** (if using your own project):
   - Update `firebase-config.js` with your Firebase credentials

3. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Test the App**:
   - Click "Enter Karigar" from start page
   - Explore the landing page
   - Sign up as Customer, Provider, or Admin

## 📝 Notes

- Security rules are currently in testing mode (allow all)
- For production, deploy `firestore.rules.production`
- All user data is stored in Firebase Firestore
- Firebase is loaded from CDN (no npm install required)

## 🎨 Design Features

- **Premium 3D UI**: Deep shadows, layered elements, glass-morphism
- **Smooth Animations**: Page transitions, hover effects, loading states
- **Color Palette**: Primary Indigo (#4338CA) & Accent Amber (#F59E0B)
- **Responsive**: Mobile-first design for all screen sizes
- **Modern Typography**: Inter & Poppins fonts

## 👨‍💻 Team

**Prompt Engineers** - WebHackathon 2025

---

© 2025 Karigar | Designed & Developed by Prompt Engineers
- Clean, professional interface
- Smooth animations and transitions

## 📄 License

Built for educational purposes - Web + AI Hackathon 2025

---

Made with ❤️ by Prompt Engineers
