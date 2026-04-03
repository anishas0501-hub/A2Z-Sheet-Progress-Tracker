# A2Z LeetCode - DSA Mastery Portal 🚀

A modern, highly interactive, and beautifully designed Data Structures and Algorithms tracking platform built with **React**, **Vite**, and **Framer Motion**. Inspired by Striver's A2Z DSA sheet, this platform helps developers structure their coding interview preparation seamlessly.

![A2Z LeetCode Mockup](https://via.placeholder.com/1200x600?text=A2Z+LeetCode+Dashboard)

## ✨ Features

- **Structured Curriculum:** Problems categorized logically from arrays to advanced graphs and dynamic programming.
- **Dynamic Dashboard:** Real-time visual progress tracking using **Recharts** (Pie charts & progress bars for difficulty levels).
- **Interactive Question Lists:** Expandable topic sections, status tracking (✅ completed), difficulty indications, and one-click redirection to LeetCode.
- **Local Data Persistence:** All your progress, marked questions, and completions are saved directly in your browser using LocalStorage—no signup required.
- **Premium Animations:** Smooth page transitions, hover effects, and spring animations powered by **Framer Motion**.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** CSS3 variables with a custom modern dark theme.
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Deployment:** Vercel

## 🚀 Getting Started Locally

Follow these steps to set up the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/anishas0501-hub/A2Z-LeetCode.git
cd A2Z-LeetCode
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` to see the application in action.

## 🚢 Deployment

This application can easily be deployed using Vercel.

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and authenticate.
3. Run `vercel --prod` to deploy!

**Live Demo:** [https://dsa-portal-q2x4h3s40-anishas0501-2764s-projects.vercel.app](https://dsa-portal-q2x4h3s40-anishas0501-2764s-projects.vercel.app)

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Dashboard, QuestionRow, ProblemSheet)
│   └── ui/           # Primitive UI components (AnimatedCard, ProgressBar)
├── context/          # React Context for global state management (Progress tracking)
├── data/             # Static structured problem data (dsaData.js)
├── index.css         # Global styles and CSS variables
├── App.jsx           # Main application routing & layout
└── main.jsx          # Entry point
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/anishas0501-hub/A2Z-LeetCode/issues).

---
*Built with ❤️ by Anisha.*
