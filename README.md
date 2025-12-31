<div align="center">

# 🛡️ InsuranceMate

### ผู้ช่วยเรื่องประกันในมือคุณ

**A modern insurance management web application with Thai language support**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://pongsakfms-commits.github.io/insurance-mate/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](https://pongsakfms-commits.github.io/insurance-mate/login.html) • [Documentation](USER_MANUAL_TH.md) • [Report Bug](https://github.com/pongsakfms-commits/insurance-mate/issues) • [Request Feature](https://github.com/pongsakfms-commits/insurance-mate/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About

**InsuranceMate** is a comprehensive web application designed to help Thai users manage their insurance policies efficiently. Built with modern web technologies and featuring a premium user interface, it provides an intuitive way to track policies, submit claims, and communicate with insurance agents.

### Key Highlights

- 🌟 **Premium UI/UX** - Beautiful gradient-based design with smooth animations
- 🇹🇭 **Thai Language** - Complete Thai language support with Prompt font
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices
- 🔐 **Authentication** - Secure login/register system with session management
- 💾 **Data Persistence** - LocalStorage-based backend (Firebase-ready)
- ⚡ **Zero Dependencies** - Pure HTML, CSS, and Vanilla JavaScript

---

## ✨ Features

### Core Functionality

| Feature | Description | Status |
|---------|-------------|--------|
| 🏠 **Dashboard** | View all insurance policies and expiry alerts | ✅ Complete |
| 🔐 **Authentication** | Login/Register with email & password | ✅ Complete |
| 👨‍👩‍👧‍👦 **Family Management** | Track policies for family members | ✅ Complete |
| 📤 **Claims Processing** | Submit and track insurance claims | ✅ Complete |
| 👨‍💼 **Agent Portal** | Contact and chat with insurance agents | ✅ Complete |
| 🔍 **Agent Search** | Find and connect with new agents | ✅ Complete |
| 📊 **Reports** | Generate summary reports and export PDF | ✅ Complete |
| ⚙️ **Settings** | Customize app preferences | ✅ Complete |

### Recent Updates (v1.0.0)

- ✅ Full authentication system with LocalStorage backend
- ✅ Add family member with avatar selection
- ✅ Make appointment with insurance agent
- ✅ Settings page with user preferences
- ✅ Export PDF reports (simulated)
- ✅ 12+ new interactive features

[See detailed changelog →](CHANGELOG.md)

---

## 🚀 Demo

### Live Application

Try the app: **[InsuranceMate Demo](https://pongsakfms-commits.github.io/insurance-mate/login.html)**

**Demo Account:**
```
Email: demo@email.com
Password: password
```

### Screenshots

<div align="center">

| Login Page | Dashboard | Family Management |
|------------|-----------|-------------------|
| ![Login](https://via.placeholder.com/250x150/667eea/ffffff?text=Login+Page) | ![Dashboard](https://via.placeholder.com/250x150/764ba2/ffffff?text=Dashboard) | ![Family](https://via.placeholder.com/250x150/667eea/ffffff?text=Family) |

| Claims | Agent Portal | Settings |
|--------|--------------|----------|
| ![Claims](https://via.placeholder.com/250x150/764ba2/ffffff?text=Claims) | ![Agent](https://via.placeholder.com/250x150/667eea/ffffff?text=Agent) | ![Settings](https://via.placeholder.com/250x150/764ba2/ffffff?text=Settings) |

</div>

---

## 🛠️ Tech Stack

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **HTML5** - Semantic markup
- **CSS3** - Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript** - ES6+ features, no frameworks

### Backend (Current)

![LocalStorage](https://img.shields.io/badge/LocalStorage-FF6B35?style=for-the-badge&logo=javascript&logoColor=white)

- **LocalStorage API** - Client-side data persistence
- **Session Management** - User authentication state

### Backend (Planned)

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

- **Firebase Authentication** - Real user authentication
- **Cloud Firestore** - NoSQL cloud database
- **Firebase Storage** - File storage for documents

### Design

![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)

- **Google Fonts** - Prompt font family for Thai typography
- **Custom CSS Variables** - Theming system
- **SVG Icons** - Inline scalable icons

---

## 🏁 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Local web server (optional): XAMPP, Live Server, or Python HTTP server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pongsakfms-commits/insurance-mate.git
   cd insurance-mate
   ```

2. **Open with a web server**

   **Option A: Using VS Code Live Server**
   ```
   - Install "Live Server" extension
   - Right-click on index.html
   - Select "Open with Live Server"
   ```

   **Option B: Using Python**
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000/login.html
   ```

   **Option C: Using XAMPP**
   ```
   - Copy files to htdocs folder
   - Open http://localhost/insurance-mate/login.html
   ```

3. **Start using the app**
   ```
   Navigate to: http://localhost:8000/login.html
   Login with: demo@email.com / password
   ```

### Quick Start

See [QUICKSTART.md](QUICKSTART.md) for a detailed quick start guide.

---

## 📖 Usage

### For End Users

1. **Login** to your account or **Register** a new one
2. **View** your insurance policies on the dashboard
3. **Add** family members and their policies
4. **Submit** claims with supporting documents
5. **Contact** your insurance agent directly
6. **Generate** annual summary reports

[Full User Manual (Thai) →](USER_MANUAL_TH.md)

### For Developers

1. **Explore** the codebase structure
2. **Customize** the design in `styles.css`
3. **Add features** in `app.js`
4. **Test** your changes locally
5. **Submit** a pull request

[Contributing Guidelines →](CONTRIBUTING.md)

---

## 📁 Project Structure

```
insurance-mate/
├── 📄 index.html              # Main application page
├── 🔐 login.html              # Login/Register page
├── 🎨 styles.css              # Global styles (24KB)
├── ⚙️ app.js                  # Application logic (55KB)
├── 🔧 firebase-config.js      # Firebase config template
│
├── 📚 Documentation
│   ├── README.md              # This file
│   ├── USER_MANUAL_TH.md      # Thai user manual (25KB)
│   ├── BACKEND_README.md      # Backend documentation
│   ├── QUICKSTART.md          # Quick start guide
│   ├── FIREBASE_SETUP.md      # Firebase setup guide
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   ├── CHANGELOG.md           # Version history
│   └── FILES_TO_UPLOAD.md     # GitHub upload checklist
│
└── ⚖️ LICENSE                 # MIT License
```

**Total:** 13 files | ~120KB | 1,800+ lines of code

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Completed)
- [x] Premium UI design with Thai language
- [x] Responsive layout for all devices
- [x] 6+ main pages with full functionality
- [x] Modal system for detailed views
- [x] Smooth animations and transitions

### ✅ Phase 2: Backend (Completed)
- [x] Login/Register system
- [x] LocalStorage data persistence
- [x] Session management
- [x] User authentication flow

### 🔄 Phase 3: Firebase Integration (In Progress)
- [ ] Firebase Authentication
- [ ] Cloud Firestore database
- [ ] Real-time data synchronization
- [ ] Firebase Storage for files
- [ ] Multi-device support

### 🔮 Phase 4: Advanced Features (Planned)
- [ ] Push notifications
- [ ] OCR policy scanning
- [ ] Payment gateway integration
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native/Flutter)
- [ ] English language support
- [ ] Dark mode theme
- [ ] Advanced analytics

[View detailed roadmap →](https://github.com/pongsakfms-commits/insurance-mate/projects)

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Contributors

Thanks to these wonderful people:

<!-- Add contributors here when available -->
<a href="https://github.com/pongsakfms-commits/insurance-mate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pongsakfms-commits/insurance-mate" />
</a>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this project freely, even for commercial purposes.

---

## 📞 Contact

**Project Maintainer:** Pongsakfms

- GitHub: [@pongsakfms-commits](https://github.com/pongsakfms-commits)
- Email: support@insurancemate.com (simulated)
- Website: [insurancemate.com](https://pongsakfms-commits.github.io/insurance-mate/) (demo)

**Project Link:** [https://github.com/pongsakfms-commits/insurance-mate](https://github.com/pongsakfms-commits/insurance-mate)

---

## 🙏 Acknowledgments

- [Google Fonts](https://fonts.google.com/) - Prompt font family
- [UI Avatars](https://ui-avatars.com/) - Avatar generation
- [Shields.io](https://shields.io/) - README badges
- [Keep a Changelog](https://keepachangelog.com/) - Changelog format
- [Semantic Versioning](https://semver.org/) - Version numbering

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/pongsakfms-commits/insurance-mate?style=social)
![GitHub forks](https://img.shields.io/github/forks/pongsakfms-commits/insurance-mate?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/pongsakfms-commits/insurance-mate?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/pongsakfms-commits/insurance-mate)
![GitHub issues](https://img.shields.io/github/issues/pongsakfms-commits/insurance-mate)
![GitHub pull requests](https://img.shields.io/github/issues-pr/pongsakfms-commits/insurance-mate)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Made with ❤️ for Thai Insurance Users**

</div>
