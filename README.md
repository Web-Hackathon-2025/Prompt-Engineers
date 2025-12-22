# 🛠️ Karigar - Connecting You with Skilled Artisans

> *"Karigar"* (کاریگر) means "artisan" or "skilled craftsman" in Urdu — and that's exactly what this platform celebrates.

**WebHackathon 2025 | Team Prompt Engineers**

---

## 💡 What is Karigar?

Have you ever needed an electrician at midnight? A plumber on a Sunday? Or struggled to find a trustworthy carpenter in your neighborhood?

**Karigar** solves this everyday problem. It's a modern marketplace that bridges the gap between **customers who need services** and **skilled local workers (karigars)** who provide them.

Think of it as your digital neighborhood — where finding a reliable handyman is as easy as ordering food online.

---

## 🎯 The Problem We're Solving

In Pakistan and many developing regions:

- 📞 Finding service providers relies on word-of-mouth or random phone numbers
- 🤷 No way to verify quality, reviews, or pricing before hiring
- 📍 Location-based search is nearly impossible
- 💸 No transparency in pricing or job completion
- 🔒 Safety concerns when inviting strangers into your home

**Karigar addresses all of these** by creating a trusted, verified ecosystem where both customers and providers benefit.

---

## ✨ Key Features

### 👤 For Customers (Homeowners & Businesses)

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Find providers by service type, location, and availability |
| ⭐ **Ratings & Reviews** | See real feedback from previous customers |
| 📋 **Easy Booking** | Submit service requests with just a few clicks |
| 📊 **Track Progress** | Monitor your request from submission to completion |
| 🔔 **Notifications** | Get updates when providers respond or complete work |
| 🌙 **Dark Mode** | Easy on the eyes, day or night |

### 🔧 For Service Providers (Karigars)

| Feature | Description |
|---------|-------------|
| 📝 **Professional Profile** | Showcase your skills, experience, and certifications |
| 📥 **Incoming Requests** | Receive job requests matching your skills |
| ✅ **Accept/Reject Jobs** | Full control over which jobs you take |
| 💰 **Earnings Dashboard** | Track completed jobs and earnings |
| 🏆 **Build Reputation** | Collect reviews and build trust over time |
| 📍 **Set Your Area** | Define where you're willing to work |

### 👨‍💼 For Administrators

| Feature | Description |
|---------|-------------|
| 👥 **User Management** | Approve, verify, or suspend accounts |
| 📊 **Platform Overview** | Monitor all service requests and activity |
| 🛡️ **Quality Control** | Ensure providers meet platform standards |
| 📈 **Analytics** | Track platform growth and usage |

---

## 🎨 Design Philosophy

We didn't just build a functional app — we crafted an **experience**.

### Premium 3D Visual Design
- **Glass-morphism effects** with frosted backgrounds
- **Deep shadows & layered depth** for a modern, premium feel
- **Smooth animations** on every interaction
- **Vibrant gradients** that pop without being overwhelming

### Color Palette
- **Primary**: Indigo (#4338CA) — Trust, professionalism
- **Accent**: Amber (#F59E0B) — Energy, warmth
- **Clean whites** and **soft grays** for readability

### Responsive Design
- Works beautifully on **mobile phones**, **tablets**, and **desktops**
- Touch-friendly buttons and navigation
- Optimized for real-world usage scenarios

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Pure HTML5, CSS3, JavaScript (No frameworks!) |
| **Backend** | Firebase (Google's serverless platform) |
| **Database** | Cloud Firestore (Real-time NoSQL) |
| **Authentication** | Firebase Auth (Email + Google Sign-In) |
| **Hosting** | GitHub Pages / Firebase Hosting |
| **Security** | Custom security.js + Firestore Rules |

### Why No Frameworks?

We intentionally built this with **vanilla technologies** to demonstrate:
- Deep understanding of core web fundamentals
- Faster load times (no heavy libraries)
- Full control over every aspect of the code
- Proof that beautiful, functional apps don't need React or Vue

---

## 📁 Project Structure

```
Karigar/
│
├── 🚀 start-here.html          # Welcome page - Start your journey
├── 🏠 index-3d.html            # Main landing page with hero section
├── 🔐 login-3d.html            # Login & Registration (all roles)
├── 👤 customer-3d.html         # Customer dashboard
├── 🔧 provider-3d.html         # Provider dashboard
├── 👨‍💼 admin-3d.html            # Admin control panel
│
├── 🎨 style-3d.css             # Complete design system
├── ✨ page-transitions.js      # Smooth page animations
├── 🛡️ security.js              # Input sanitization & validation
│
├── 📜 firestore.rules          # Database rules (development)
├── 🔒 firestore.rules.production  # Database rules (production)
│
├── 📝 README.md                # You're reading this!
└── 🙈 .gitignore               # Files excluded from Git
```

---

## 🚀 Getting Started

### Quick Start (2 minutes)

1. **Download or clone** this repository
2. **Open** `start-here.html` in any browser
3. **Click** "Enter Karigar" to explore
4. **Sign up** as Customer, Provider, or Admin

### Using VS Code (Recommended)

1. Open the project folder in VS Code
2. Install the **Live Server** extension
3. Right-click `start-here.html` → "Open with Live Server"
4. Enjoy hot-reloading as you explore!

---

## 👥 User Roles Explained

### 🛒 Customer
Regular users looking for services. They can browse providers, submit requests, and leave reviews.

### 🔧 Provider  
Skilled workers offering services. They create profiles, receive job requests, and build their reputation.

### 🔐 Admin
Platform managers who verify providers, handle disputes, and maintain quality standards.

**Admin Access Code**: `KARIGAR_ADMIN_2025`

---

## 🔒 Security Measures

We take security seriously. Here's what protects your data:

### Client-Side Protection
- ✅ XSS attack prevention (input sanitization)
- ✅ Password strength validation
- ✅ Rate limiting on login attempts
- ✅ Secure session management
- ✅ SQL injection pattern detection

### Server-Side Protection (Firestore)
- ✅ Role-based access control
- ✅ Users can only access their own data
- ✅ Providers can't modify customer data
- ✅ Admins have controlled elevated access
- ✅ All writes validated before saving

---

## 🌐 How to Deploy

### Option 1: GitHub Pages (Free & Easy)

1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository named `karigar`
3. Push your code using Git or GitHub Desktop
4. Go to Settings → Pages → Select "main" branch
5. Your site will be live at `https://yourusername.github.io/karigar/`

### Option 2: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🎥 How It Works

1. **Start Page** → Beautiful welcome screen with team branding
2. **Landing Page** → Discover features, services, and how it works
3. **Sign Up** → Choose your role (Customer, Provider, or Admin)
4. **Dashboard** → Access role-specific features and manage your activity
5. **Connect** → Customers find providers, providers get jobs, everyone wins!

---

## 🤝 Our Vision

Karigar isn't just an app — it's a **movement**.

We envision a future where:
- Every skilled worker has a **digital presence** and fair opportunities
- Customers can **trust** who they invite into their homes
- Quality service providers **thrive** through their reputation
- The informal economy becomes **organized**, **transparent**, and **fair**

In many parts of the world, talented karigars (artisans) struggle to find consistent work despite their skills. Meanwhile, customers rely on unreliable recommendations. Karigar bridges this gap with technology, trust, and transparency.

---

## 👨‍💻 Meet Team Prompt Engineers

Built with ❤️ for **WebHackathon 2025**

We're a passionate team of developers who believe technology should solve real-world problems. This project represents our vision of empowering both customers and workers in the service economy.

**Our Goal**: Create something that could actually help people — not just win a hackathon, but make a difference.

---

## 🙏 Acknowledgments

- **Firebase** for the powerful backend infrastructure
- **Google Fonts** for beautiful typography
- **The open-source community** for inspiration and resources
- **WebHackathon 2025** for the opportunity to build and showcase

---

## 📜 License

This project was created for educational and competition purposes as part of WebHackathon 2025. Feel free to learn from it, fork it, and build upon it — but please give credit where it's due.

---

<div align="center">

### 🛠️ **Karigar — Where Skills Meet Opportunity** 🛠️

*Built with passion. Designed with purpose. Ready for the future.*

---

**© 2025 Team Prompt Engineers | WebHackathon 2025**

</div>
