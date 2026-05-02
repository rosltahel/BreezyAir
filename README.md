# BreezyAir 🌬️

A multi-page React website for a fictional premium “artisanal air” product.  
Designed with a strong focus on UX, conversion, and modern frontend practices.

---

## 🔗 Live Demo

👉 https://rosltahel.com

---

## 🧠 README Questions

### 1. Hosting

I deployed this project on **Hostinger** using its static hosting via the `public_html` directory.

I chose Hostinger because:
- It is simple and affordable
- It supports static site hosting easily
- It allows quick deployment by uploading build files

Since this project is built with React and Vite, I generated a production build using:

    npm run build

Then I uploaded the contents of the `dist` folder directly to `public_html`.

---

### 2. CMS / Content Management

Currently, all content (text, pricing, FAQ, features) is stored directly in the codebase, mainly inside React components and a shared `data.js` file.

For a non-technical marketing user, this setup is not ideal because it requires editing code.

To improve this, I would:
- Move content into a **headless CMS** (WordPress, Sanity, Contentful)
- Allow marketing users to update content through a UI dashboard
- Fetch content dynamically in the frontend

As a simpler improvement, I would centralize all editable content in one structured file so updates are easier and safer.

---

### 3. Security

Since this is a static frontend project, security risks are minimal.

Current considerations:
- No API keys or secrets are exposed
- No database or authentication is implemented
- Forms are frontend-only (no sensitive data is stored)

For a production deployment, I would add:

- Input validation for all forms
- Spam protection (e.g., reCAPTCHA)
- Backend validation for real data submission
- Secure payment integration (e.g., Stripe)
- Content Security Policy (CSP) headers
- Dependency checks using:

    npm audit

---

### 4. Code Maintenance

Another developer can easily set up and run this project:

    git clone https://github.com/rosltahel/BreezyAir.git
    cd BreezyAir
    npm install
    npm run dev

Project structure:

    src/
      components/
      pages/
      data.js
      styles.css
      App.jsx

Maintenance is supported by:
- Modular React components
- Clear folder structure
- Separation between UI and data

To improve maintainability:
- Add more inline comments
- Document components
- Add testing (unit + integration)
- Use consistent naming conventions
- Add a contributor guide

---

### 5. Performance

The project uses **Vite**, which provides fast builds and optimized output.

Current optimizations:
- Minified production build
- Lightweight CSS animations
- Static hosting (no server overhead)

Future improvements:
- Optimize and compress images
- Use lazy loading for assets
- Reduce unused CSS
- Add caching headers
- Use Lighthouse for performance audits
- Implement code splitting if the app grows

---

### 6. New Feature

I added an **intelligent FAQ search / assistant**.

**Why I chose it:**
Users often hesitate before buying due to unanswered questions. This feature helps them quickly find relevant information, improving confidence and conversion.

**How it works:**
- Implemented entirely in the frontend using React
- Tracks user input with state
- Filters FAQ items based on keywords in questions and answers
- Displays relevant results instantly as the user types

**Improvements if extended:**
- Better ranking algorithm for results
- Highlight matched keywords
- Track common user queries
- Connect to a CMS for dynamic content
- Add a real AI assistant using a backend API
- Integrate analytics to understand user behavior

---

## 🤖 AI-Assisted Development

This project was partially built using AI-assisted development.  
I used structured prompts to guide implementation, focusing on UI improvements, UX decisions, and clean architecture.

### Example Prompt

> "Add subtle animations to the hero section that represent airflow and freshness, without redesigning the page or adding new dependencies. Keep changes minimal and explain what was modified."

---

## 📸 AI Prompt Transcripts

Here are examples of AI prompts and outputs that helped shape this project:


<img width="841" height="992" alt="image" src="https://github.com/user-attachments/assets/c5923947-5401-48ff-85be-d37a4597e5cb" />

<img width="879" height="1057" alt="image" src="https://github.com/user-attachments/assets/49169da5-6325-43cf-9514-fe24a29bd4df" />



---

## 🖼️ Project Screenshots

![Homepage](./screenshots/home.png)
![Pricing](./screenshots/pricing.png)
![FAQ](./screenshots/faq.png)

---

## ✨ Key Highlights

- Modern React + Vite architecture
- Multi-page routing with Wouter
- Conversion-focused UI design
- Interactive FAQ search
- Subtle animations aligned with product concept
- Fully deployed production app

---

## 🚀 Future Improvements

- Add backend (FastAPI / Node.js)
- Integrate real AI assistant
- Connect to CMS
- Add authentication and user personalization
- Improve analytics and tracking
