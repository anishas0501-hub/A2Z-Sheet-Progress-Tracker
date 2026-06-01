# A2Z Sheet-Progress-Tracker - DSA Mastery Portal 🚀

[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-3.0-orange?style=for-the-badge&logo=chart)](https://recharts.org/)

A state-of-the-art, highly interactive, and beautifully designed Data Structures and Algorithms tracking platform built with **React**, **Vite**, and **Framer Motion**. Inspired by Striver's A2Z DSA sheet, this portal is specifically engineered to help developers structure their coding preparation while offering a high-fidelity visual experience recruiters will notice immediately.

---

## ✨ Features & UX Details

The portal is packed with modern UI patterns and clean heuristics designed to maximize usability and reduce cognitive load:

- 📊 **Dynamic Analytics Dashboard**:
  - **Key Metrics**: Real-time stats showing *Total Solved*, *Completion Rate (%)*, *Problems Remaining*, and *Current Focus*.
  - **Smart Focus Heuristic**: Automatically determines your current topic in progress (first partially completed step or the first unstarted step) so you always know what to study next.
  - **Topic Progress Grid**: A dedicated summary list of all 17 modules, complete with individual, animated horizontal progress bars and exact absolute counts.
  - **Overall Progress & Breakdown**: Interactive radial chart visualizations representing solved vs. unsolved questions, alongside separate Easy, Medium, and Hard milestones.

- 🗂️ **Problems Page Accordion**:
  - All curriculum sections are collapsed by default to prevent overwhelm.
  - Single-open accordion logic ensures expanding one section automatically collapses the previous one.

- 🔍 **Real-Time Dynamic Search**:
  - Instantly search and filter across **Problem Names**, **Topics**, or **Difficulties** (e.g. typing `tree` displays all tree questions instantly).
  - **Auto-Expansion**: Accordions automatically expand in search mode, showing matches immediately without manual toggling.

- 📅 **Local Storage Updates & Timestamps**:
  - Fully serverless data persistence via browser LocalStorage.
  - Toggles are time-stamped. The sidebar displays a dynamically formatted `"Last Updated"` timestamp (e.g. *June 1, 2026*).

- 🎨 **Premium Aesthetic & Visual Polish**:
  - Styled visual dots embedded directly in difficulty badges (🟢 Easy, 🟡 Medium, 🔴 Hard).
  - Clean glassmorphism styling, harmonized CSS dark-mode palettes, and spring physics micro-animations.
  - Active navigation menu polishes with colored accent-left indicator borders and hover lifts.
  - Highly motivating, designed Empty State card prompts for new users with 0 completed problems: *"Start with Arrays to build momentum 🚀"*.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 7 (ECMAScript Modules)
- **Styling**: Modern CSS3 custom variables with a tailored glassmorphic dark theme
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: Recharts (Custom SVG filters & tooltip layouts)
- **State Management**: React Context API for global progress sync

---

## 📁 Project Structure

```
src/
├── components/       # Core UI components
│   ├── ui/           # Atom layouts (AnimatedCard, ProgressBar)
│   ├── Dashboard.jsx # Dynamic dashboard grid & charts
│   ├── ProblemSheet.jsx # Accordion, Search & curriculum structure
│   ├── QuestionRow.jsx  # Question item status & difficulty badges
│   └── QuestionList.jsx # Legacy pages / reference lists
├── context/          # React Context (ProgressContext with LocalStorage timestamp)
├── data/             # Static structured problem data (dsaData.js)
├── pages/            # Legacy analytical route modules (Problems, Dashboard)
├── index.css         # Global style tokens, custom variables & animations
├── App.jsx           # App layout, Sidebar nav, and context routing
└── main.jsx          # Entry point
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/anishas0501-hub/A2Z-LeetCode.git
cd A2Z-LeetCode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🚢 Deployment

Easily deployable using **Vercel**:

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Live Demo:** [https://dsa-portal-q2x4h3s40-anishas0501-2764s-projects.vercel.app](https://dsa-portal-q2x4h3s40-anishas0501-2764s-projects.vercel.app)

---
*Built with ❤️ by Anisha.*
