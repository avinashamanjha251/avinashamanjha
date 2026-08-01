# Avinash Aman - Senior iOS Engineer Portfolio

This is a modern, responsive, high-performance single-page developer portfolio website for **Avinash Aman (Senior iOS Engineer)**, designed to be hosted directly on **GitHub Pages**.

---

## 🚀 Features

- **Apple / iOS Glassmorphism Theme**: Sleek dark mode UI with frosted glass cards, glowing accents, and modern typography.
- **Interactive Project Filtering**: Filter projects by categories (Health & Wearables, Fintech, Messaging, Location).
- **Career Timeline**: Work experience with highlighted metric badges (+40% DAU, zero deployment failures, 10k+ chat users).
- **Technical Skills Matrix**: Clear categorization of Swift, SwiftUI, Objective-C, Core Data, WatchKit, Fastlane, etc.
- **One-Click Actions**:
  - Copy Email & Phone Number with Toast notification.
  - Save / Print Resume PDF shortcut (optimized CSS media print layout).
- **Mobile First**: Fully responsive on iPhone, iPad, and desktop viewports.

---

## 💻 Files Structure

```text
├── index.html    # Main single page portfolio structure & content
├── style.css     # CSS design system (Glassmorphism, animations, print mode)
├── script.js     # JavaScript interactions (filtering, clipboard copy, scrollspy)
└── README.md     # Setup & GitHub Pages Deployment Guide
```

---

## 🛠️ Step-by-Step: How to Host on GitHub Pages

Follow these simple steps to put your portfolio live on GitHub Pages:

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/) and click the **`+`** icon at the top right -> **New repository**.
2. Name your repository (e.g., `resume` or `portfolio` or `avinashaman.github.io`).
3. Set visibility to **Public**.
4. Leave "Add a README file" unchecked (since we already have one).
5. Click **Create repository**.

### Step 2: Push your code to GitHub
Open your Terminal inside this folder (`/Volumes/Project/Doc/New CV/Github/Resume`) and run the following commands:

```bash
# 1. Initialize Git repository (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Commit files
git commit -m "Initial commit - Senior iOS Developer Portfolio"

# 4. Rename main branch
git branch -M main

# 5. Connect your GitHub repository (Replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your GitHub repository in your browser.
2. Click on **Settings** (gear icon at the top menu).
3. On the left sidebar, click on **Pages**.
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Under **Branch**, select **`main`** and folder **`/ (root)`**.
6. Click **Save**.

🎉 Within 1 to 2 minutes, GitHub will publish your site at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 📄 License & Credits
Designed & Developed for **Avinash Aman** - Senior iOS Engineer.
