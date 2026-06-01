import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks } from 'lucide-react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import Dashboard from './components/Dashboard';
import ProblemSheet from './components/ProblemSheet';
import './index.css';

const Sidebar = () => {
  const { lastUpdated } = useProgress();

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <nav className="sidebar">
      <div style={{ marginBottom: "32px", paddingLeft: "16px" }}>
        <h2 className="text-gradient" style={{ fontSize: "20px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
          A2Z Sheet<br/>Progress-Tracker
        </h2>
      </div>
      <div className="flex-col gap-2" style={{ flex: 1 }}>
        <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/track" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <ListChecks size={20} /> Curriculum
        </NavLink>
      </div>
      <div className="sidebar-footer" style={{ paddingLeft: "16px", borderTop: "1px solid var(--glass-border)", paddingTop: "16px", marginTop: "auto" }}>
        <p className="text-muted" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>Last Updated</p>
        <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{formatDate(lastUpdated)}</p>
      </div>
    </nav>
  );
};

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