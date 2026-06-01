import React, { useState } from 'react';
import { dsaData } from '../data/dsaData';
import { ChevronDown, ChevronRight, ExternalLink, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionRow from './QuestionRow';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from './ui/ProgressBar';

export default function ProblemSheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStepId, setActiveStepId] = useState(null);

  // Filter questions, topics, and steps based on search term
  const filteredData = dsaData.map(step => {
    const matchedTopics = step.topics.map(topic => {
      const matchedQuestions = topic.questions.filter(q => {
        const term = searchTerm.toLowerCase();
        const matchesName = q.title.toLowerCase().includes(term);
        const matchesTopic = topic.title.toLowerCase().includes(term) || step.title.toLowerCase().includes(term);
        const matchesDiff = q.difficulty.toLowerCase().includes(term);
        return matchesName || matchesTopic || matchesDiff;
      });
      return { ...topic, questions: matchedQuestions };
    }).filter(t => t.questions.length > 0);

    return { ...step, topics: matchedTopics };
  }).filter(s => s.topics.length > 0);

  return (
    <div>
      <div className="card-header">
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Problem Sheet</h1>
        <p className="text-muted">Your complete roadmap to master DSA. Follow sequentially.</p>
      </div>

      {/* Premium Search Bar */}
      <div style={{ marginBottom: "32px", position: "relative" }}>
        <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by problem name, topic, or difficulty (easy, medium, hard)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px 14px 48px",
            fontSize: "15px",
            background: "var(--bg-card)",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            color: "var(--text-primary)",
            outline: "none",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "6px",
              padding: "4px 8px",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
          >
            Clear
          </button>
        )}
      </div>

      {filteredData.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--bg-card)", border: "1px dashed var(--glass-border)", borderRadius: "16px", marginTop: "16px" }}>
          <p className="text-muted" style={{ fontSize: "16px", marginBottom: "8px" }}>No matching problems found.</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Try searching for a different keyword or difficulty level.</p>
        </div>
      ) : (
        <div className="flex-col gap-4">
          {filteredData.map((step) => (
            <StepSection 
              key={step.id} 
              step={step} 
              isOpen={searchTerm.trim() !== "" || activeStepId === step.id}
              onToggle={() => setActiveStepId(activeStepId === step.id ? null : step.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StepSection({ step, isOpen, onToggle }) {
  const { completed } = useProgress();

  // Calculate step progress
  let stepTotal = 0;
  let stepSolved = 0;
  step.topics.forEach(t => {
    t.questions.forEach(q => {
      stepTotal++;
      if (completed[q.id]) stepSolved++;
    });
  });

  return (
    <div className="topic-accordion">
      <div className="topic-header" onClick={onToggle}>
        <div>
          <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            {step.title}
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="text-muted" style={{ fontSize: "14px", minWidth: "40px" }}>
            {stepSolved} / {stepTotal}
          </span>
          <div style={{ width: "100px" }}>
             <ProgressBar value={stepSolved} max={stepTotal} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 20px 20px 20px", borderTop: "1px solid var(--glass-border)" }}>
              {step.topics.map((topic, index) => (
                <div key={topic.id} style={{ marginTop: "24px" }}>
                  <h4 style={{ marginBottom: "16px", color: "var(--accent-primary)", fontSize: "15px" }}>
                    {topic.title}
                  </h4>
                  <div style={{ overflowX: "auto" }}>
                    <table className="table-layout">
                      <thead>
                        <tr>
                          <th style={{ width: "60px", textAlign: "center" }}>Status</th>
                          <th>Problem Title</th>
                          <th style={{ width: "140px" }}>Difficulty</th>
                          <th style={{ width: "80px", textAlign: "center" }}>Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {topic.questions.map((q, idx) => (
                            <QuestionRow 
                              key={q.id} 
                              question={q} 
                              delay={idx * 0.05} 
                            />
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
