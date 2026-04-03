import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks } from 'lucide-react';
import { ProgressProvider } from './context/ProgressContext';
import Dashboard from './components/Dashboard';
import ProblemSheet from './components/ProblemSheet';
import './index.css';

const Sidebar = () => (
  <nav className="sidebar">
    <div style={{ marginBottom: "32px", paddingLeft: "16px" }}>
      <h2 className="text-gradient" style={{ fontSize: "28px", fontWeight: "700" }}>A2Z LeetCode</h2>
    </div>
    <div className="flex-col gap-2">
      <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20} /> Dashboard
      </NavLink>
      <NavLink to="/track" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
        <ListChecks size={20} /> Curriculum
      </NavLink>
    </div>
  </nav>
);

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/track" element={<ProblemSheet />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;