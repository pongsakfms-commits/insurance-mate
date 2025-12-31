# Contributing to InsuranceMate

First off, thank you for considering contributing to InsuranceMate! 🎉

## 🌟 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 120]
- Device: [e.g. Desktop, Mobile]
```

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **explain the behavior you expected**
- **Explain why this enhancement would be useful**

### Pull Requests 🔄

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request**

**Pull Request Template:**
```markdown
**Description**
Brief description of what this PR does.

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Testing**
Describe the tests you ran and how to reproduce them.

**Checklist:**
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers
```

## 🎨 Style Guidelines

### JavaScript Style Guide

- Use **ES6+** syntax
- Use **const** and **let** instead of **var**
- Use **arrow functions** where appropriate
- Use **template literals** for string concatenation
- Add **comments** for complex logic
- Keep functions **small and focused**

**Example:**
```javascript
// Good
const calculatePremium = (baseAmount, duration) => {
    return baseAmount * duration * 1.05;
};

// Bad
var calculatePremium = function(baseAmount, duration) {
    var result = baseAmount * duration * 1.05;
    return result;
}
```

### CSS Style Guide

- Use **CSS variables** for colors and spacing
- Follow **BEM naming convention** where applicable
- Keep selectors **specific but not overly nested**
- Group related properties together
- Use **meaningful class names**

**Example:**
```css
/* Good */
.insurance-card {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
}

/* Bad */
.card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
}
```

### HTML Style Guide

- Use **semantic HTML5** elements
- Keep **attributes ordered**: class, id, data-*, other attributes
- Use **meaningful IDs and classes**
- Add **ARIA labels** for accessibility
- Indent with **4 spaces**

**Example:**
```html
<!-- Good -->
<article class="insurance-card" id="policy-123" data-type="auto">
    <h2 class="card-title">ประกันรถยนต์</h2>
    <p class="card-description">กรุงเทพประกันภัย</p>
</article>

<!-- Bad -->
<div class="card" id="123">
    <div>ประกันรถยนต์</div>
    <div>กรุงเทพประกันภัย</div>
</div>
```

## 📁 Project Structure

```
insurance-mate/
├── index.html              # Main app page
├── login.html              # Login/Register page
├── styles.css              # Global styles
├── app.js                  # Application logic
├── README.md               # Project overview
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MIT License
├── CHANGELOG.md            # Version history
├── USER_MANUAL_TH.md       # Thai user manual
├── BACKEND_README.md       # Backend documentation
└── .gitignore             # Git ignore rules
```

## 🧪 Testing Guidelines

### Before Submitting

Test your changes on:
- ✅ **Desktop browsers**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile browsers**: Chrome Mobile, Safari Mobile
- ✅ **Different screen sizes**: Mobile (375px), Tablet (768px), Desktop (1024px+)
- ✅ **Different data scenarios**: Empty state, Single item, Multiple items

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate input properly
- [ ] Buttons perform expected actions
- [ ] Modals open and close correctly
- [ ] Toast notifications display properly
- [ ] Data persists after page refresh
- [ ] Logout redirects to login page
- [ ] Login redirects to main app

## 🌐 Internationalization (i18n)

Currently, the app supports **Thai language** only. If you want to add more languages:

1. Create a language file (e.g., `lang-en.js`)
2. Follow the structure of Thai strings
3. Update the language switcher in Settings
4. Test all UI elements with new language

## 🔒 Security Guidelines

- **Never commit** sensitive data (API keys, passwords)
- **Validate** all user inputs
- **Sanitize** data before displaying
- **Use HTTPS** for production
- **Follow OWASP** security best practices

## 📚 Documentation

When adding new features:

1. **Update README.md** with feature description
2. **Update USER_MANUAL_TH.md** with usage instructions
3. **Update CHANGELOG.md** with version changes
4. **Add inline comments** for complex code
5. **Create examples** if needed

## 💬 Communication

- **GitHub Issues**: For bugs and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For general questions and ideas

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (when available)

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🎯 Priority Areas for Contribution

### High Priority
1. 🔥 Firebase backend integration
2. 🔥 Real authentication system
3. 🔥 File upload functionality
4. 🔥 Responsive design improvements

### Medium Priority
1. 📱 Progressive Web App (PWA)
2. 🌍 English language support
3. 📊 Advanced analytics
4. 🎨 Dark mode theme

### Low Priority
1. 🎬 Animation improvements
2. 🖼️ Custom icons
3. 📖 More documentation
4. 🧪 Unit tests

---

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/insurance-mate.git
   ```
3. **Create** a branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make** your changes
5. **Commit** your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request

---

Thank you for making InsuranceMate better! 🎉

