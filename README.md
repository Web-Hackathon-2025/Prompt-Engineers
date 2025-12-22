# 🛠️ Karigar - Service Provider Marketplace

**Built for WebHackathon 2025 by Prompt Engineers**

A premium 3D-styled service marketplace connecting customers with local service providers in Pakistan. Features a modern glass-morphism design with smooth animations and transitions.

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore + Authentication)
- **Database**: Cloud Firestore (NoSQL)
- **Authentication**: Firebase Auth (Email/Password + Google Sign-In)
- **Hosting**: GitHub Pages / Firebase Hosting
- **Design**: Premium 3D UI with glass-morphism effects
- **Security**: Client-side sanitization + Firestore security rules

## 📁 Project Structure

```
Karigar/
├── start-here.html             # 🚀 Entry point - Start here!
├── index-3d.html               # Landing page with 3D hero
├── login-3d.html               # Authentication (Login/Signup)
├── customer-3d.html            # Customer dashboard
├── provider-3d.html            # Provider dashboard  
├── admin-3d.html               # Admin dashboard
├── style-3d.css                # 3D design system & global styles
├── page-transitions.js         # Page transition animations
├── security.js                 # Security utilities (XSS, validation)
├── firebase-config.js          # Firebase configuration
├── firebase-auth.js            # Authentication utilities
├── db-utils.js                 # Database CRUD operations
├── script-firestore.js         # Core application logic
├── firestore.rules             # Database security rules (testing)
├── firestore.rules.production  # Production security rules (secure)
├── .gitignore                  # Files to exclude from GitHub
└── README.md                   # This file
```

## 🔥 Firebase Collections

- **users**: User profiles (all roles)
- **customers**: Customer-specific data
- **providers**: Provider profiles and services
- **serviceRequests**: Service booking requests
- **reviews**: Customer reviews and ratings
- **notifications**: User notifications

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

3. **Test the App**:
   - Click "Enter Karigar" from start page
   - Explore the landing page
   - Sign up as Customer, Provider, or Admin

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@karigar.com | Customer@123 |
| Provider | provider@karigar.com | Provider@123 |
| Admin | m.saad@gmail.com | m$qrd123 |

**Note:** Use `create-accounts.html` to create these test accounts if they don't exist.

## 🌐 Hosting on GitHub Pages

### Step-by-Step Guide:

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com) and sign in
   - Click the **+** button → **New repository**
   - Name it `karigar` (or any name you prefer)
   - Set it to **Public**
   - Click **Create repository**

2. **Initialize Git in Your Project**
   Open Command Prompt/Terminal in your project folder:
   ```cmd
   cd "c:\Users\User\Desktop\WebHackathon 2025\Prompt-Engineers"
   git init
   git add .
   git commit -m "Initial commit - Karigar Premium 3D UI"
   ```

3. **Connect to GitHub**
   ```cmd
   git remote add origin https://github.com/YOUR_USERNAME/karigar.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

5. **Access Your Site**
   - Wait 1-2 minutes for deployment
   - Your site will be live at: `https://YOUR_USERNAME.github.io/karigar/`
   - Start from: `https://YOUR_USERNAME.github.io/karigar/start-here.html`

### Alternative: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 🔒 Security Features

### Client-Side Protection (security.js)
- **XSS Prevention**: All user inputs are sanitized
- **Input Validation**: Email, password, phone number validation
- **SQL Injection Protection**: Pattern detection and blocking
- **Rate Limiting**: Prevents brute-force attacks
- **Secure Session Storage**: Encrypted with expiry
- **URL Validation**: Prevents open redirect attacks
- **File Upload Validation**: Type and size checking
- **Admin Code Verification**: Timing-safe comparison

### Firestore Security Rules (Production)
- **Role-Based Access Control**: Users can only access their own data
- **Field Validation**: Required fields and format checks
- **Status Checks**: Providers must be active to access certain features
- **Protected Fields**: Users cannot change their own role
- **Collection-Level Security**: Separate rules for each collection

### Before Going to Production:

1. **Deploy Production Rules**
   ```bash
   # Rename production rules
   mv firestore.rules firestore.rules.dev
   mv firestore.rules.production firestore.rules
   
   # Deploy to Firebase
   firebase deploy --only firestore:rules
   ```

2. **Enable Firebase Security**
   - Go to Firebase Console → Authentication → Settings
   - Enable "Email enumeration protection"
   - Set up App Check for additional security

3. **Set Up Domain Restrictions**
   - Go to Firebase Console → Project Settings → General
   - Under "Your apps", add authorized domains

## 📝 Notes

- Security rules in `firestore.rules` are for **testing only** (allow all)
- For production, use `firestore.rules.production` (strict security)
- All user data is stored in Firebase Firestore
- Firebase is loaded from CDN (no npm install required)
- `.gitignore` excludes sensitive files from version control

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
