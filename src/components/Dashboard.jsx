import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { dsaData } from '../data/dsaData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, Target, Star, BrainCircuit } from 'lucide-react';
import AnimatedCard from './ui/AnimatedCard';
import ProgressBar from './ui/ProgressBar';

export default function Dashboard() {
  const { completed, markedImportant } = useProgress();

  const stats = useMemo(() => {
    let total = 0;
    let solved = 0;
    let easy = 0, solvedEasy = 0;
    let medium = 0, solvedMedium = 0;
    let hard = 0, solvedHard = 0;
    
    // Clean up step titles for dynamic topic progress and current focus
    const getCleanTopicName = (title) => {
      const clean = title
        .replace(/^Step \d+\s*:\s*/i, '')
        .replace(/^(Solve Problems on|Learn|Learning)\s+/i, '');
      if (clean.toLowerCase() === 'binary trees') return 'Trees';
      if (clean.toLowerCase() === 'binary search trees') return 'BST';
      if (clean.toLowerCase() === 'important sorting techniques') return 'Sorting';
      return clean;
    };

    const topicProgressList = [];

    dsaData.forEach(step => {
      let stepTotal = 0;
      let stepSolved = 0;
      
      step.topics.forEach(topic => {
        topic.questions.forEach(q => {
          total++;
          const isSolved = completed[q.id];
          if (isSolved) solved++;
          
          stepTotal++;
          if (isSolved) stepSolved++;
          
          if (q.difficulty === 'Easy') { easy++; if(isSolved) solvedEasy++; }
          else if (q.difficulty === 'Medium') { medium++; if(isSolved) solvedMedium++; }
          else if (q.difficulty === 'Hard') { hard++; if(isSolved) solvedHard++; }
        });
      });

      topicProgressList.push({
        id: step.id,
        title: getCleanTopicName(step.title),
        total: stepTotal,
        solved: stepSolved,
        percent: stepTotal > 0 ? Math.round((stepSolved / stepTotal) * 100) : 0
      });
    });

    const importantCount = Object.values(markedImportant).filter(Boolean).length;

    // Find current focus dynamically: First started but incomplete topic,
    // otherwise the first unstarted topic.
    let currentFocus = "All Completed! 🎉";
    const startedTopic = topicProgressList.find(t => t.solved > 0 && t.solved < t.total);
    if (startedTopic) {
      currentFocus = startedTopic.title;
    } else {
      const unstartedTopic = topicProgressList.find(t => t.solved === 0 && t.total > 0);
      if (unstartedTopic) {
        currentFocus = unstartedTopic.title;
      }
    }

    return { 
      total, 
      solved, 
      easy, 
      solvedEasy, 
      medium, 
      solvedMedium, 
      hard, 
      solvedHard, 
      importantCount,
      topicProgressList,
      currentFocus
    };
  }, [completed, markedImportant]);

  const chartData = [
    { name: 'Completed', value: stats.solved },
    { name: 'Remaining', value: stats.total - stats.solved }
  ];
  const COLORS = ['#3b82f6', '#334155'];

  return (
    <div>
      <div className="card-header" style={{ marginBottom: "40px" }}>
        <h1 className="text-gradient" style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.5px" }}>Welcome Back!</h1>
        <p className="text-muted" style={{ fontSize: "16px" }}>Track your progress and conquer data structures natively.</p>
      </div>

      {/* Top Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        
        {/* Total Problems Solved */}
        <AnimatedCard delay={0.1} className="card-hover-lift" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="stat-icon-wrapper" style={{ color: "var(--accent-primary)", padding: "12px", borderRadius: "12px", width: "fit-content" }}>
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Total Solved</p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", lineHeight: "1" }}>
              {stats.solved} <span style={{fontSize: "16px", color: "var(--text-secondary)", fontWeight: "600"}}>/ {stats.total}</span>
            </h3>
          </div>
        </AnimatedCard>

        {/* Completion Rate */}
        <AnimatedCard delay={0.2} className="card-hover-lift" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="stat-icon-wrapper" style={{ color: "var(--accent-secondary)", padding: "12px", borderRadius: "12px", width: "fit-content" }}>
            <Target size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Completion Rate</p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", lineHeight: "1" }}>
              {((stats.solved / Math.max(stats.total, 1)) * 100).toFixed(0)}%
            </h3>
          </div>
        </AnimatedCard>

        {/* Current Focus */}
        <AnimatedCard delay={0.3} className="card-hover-lift" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="stat-icon-wrapper" style={{ color: "#fde047", padding: "12px", borderRadius: "12px", width: "fit-content" }}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Current Focus</p>
            <h3 style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={stats.currentFocus}>
              {stats.currentFocus}
            </h3>
          </div>
        </AnimatedCard>

        {/* Problems Remaining */}
        <AnimatedCard delay={0.4} className="card-hover-lift" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="stat-icon-wrapper" style={{ color: "#f87171", padding: "12px", borderRadius: "12px", width: "fit-content" }}>
            <Star size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Problems Remaining</p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", lineHeight: "1" }}>
              {stats.total - stats.solved}
            </h3>
          </div>
        </AnimatedCard>

      </div>

      {/* Motivating Empty State when nothing is solved */}
      {stats.solved === 0 && (
        <div style={{ marginBottom: "32px" }}>
          <AnimatedCard delay={0.1} className="glass-panel" style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>No problems solved yet.</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>Start with Arrays to build momentum 🚀</p>
          </AnimatedCard>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {/* Progress Chart */}
        <AnimatedCard delay={0.4} className="modern-gradient-bg card-hover-lift" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h3 style={{ marginBottom: "16px", width: "100%", fontSize: "16px", fontWeight: "600", color: "var(--text-secondary)", letterSpacing: "0.5px" }}>OVERALL PROGRESS</h3>
          <div style={{ width: "100%", height: "220px", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <h2 className="text-gradient" style={{ fontSize: "40px", fontWeight: "800", lineHeight: "1" }}>{stats.solved}</h2>
              <p className="text-muted" style={{ fontWeight: "500", fontSize: "14px" }}>Completed</p>
            </div>
            <ResponsiveContainer width="100%" height="100%" style={{ zIndex: 10, position: "relative" }}>
              <PieChart>
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                     <feGaussianBlur stdDeviation="5" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  stroke="none"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} filter={index === 0 ? "url(#glow)" : "none"} cornerRadius={index === 0 ? 12 : 0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50 }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: "600" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Difficulty Breakdown */}
        <AnimatedCard delay={0.5} className="modern-gradient-bg" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ width: "100%" }}>
            <h3 style={{ marginBottom: "24px", fontSize: "16px", fontWeight: "600", color: "var(--text-secondary)", letterSpacing: "0.5px" }}>DIFFICULTY BREAKDOWN</h3>
            <div className="flex-col gap-4" style={{ gap: "24px" }}>
              
              <div>
                <div className="flex-between" style={{ marginBottom: "8px" }}>
                  <span style={{ color: "var(--diff-easy-text)", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>Easy</span>
                  <span className="text-muted" style={{ fontWeight: "500", fontSize: "14px" }}>{stats.solvedEasy} / {stats.easy}</span>
                </div>
                <ProgressBar value={stats.solvedEasy} max={stats.easy} color="var(--diff-easy-text)" height="8px" />
              </div>

              <div>
                <div className="flex-between" style={{ marginBottom: "8px" }}>
                  <span style={{ color: "var(--diff-medium-text)", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>Medium</span>
                  <span className="text-muted" style={{ fontWeight: "500", fontSize: "14px" }}>{stats.solvedMedium} / {stats.medium}</span>
                </div>
                <ProgressBar value={stats.solvedMedium} max={stats.medium} color="var(--diff-medium-text)" height="8px" />
              </div>

              <div>
                <div className="flex-between" style={{ marginBottom: "8px" }}>
                  <span style={{ color: "var(--diff-hard-text)", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>Hard</span>
                  <span className="text-muted" style={{ fontWeight: "500", fontSize: "14px" }}>{stats.solvedHard} / {stats.hard}</span>
                </div>
                <ProgressBar value={stats.solvedHard} max={stats.hard} color="var(--diff-hard-text)" height="8px" />
              </div>

            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Topic Progress Section */}
      <div style={{ marginTop: "32px" }}>
        <AnimatedCard delay={0.6} className="modern-gradient-bg" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-secondary)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>Topic Progress</h3>
            <p className="text-muted" style={{ fontSize: "14px" }}>Detailed tracking across all modules in your curriculum.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {stats.topicProgressList.map((topic, index) => (
              <div 
                key={topic.id} 
                style={{ 
                  background: "rgba(255, 255, 255, 0.02)", 
                  border: "1px solid var(--glass-border)", 
                  borderRadius: "16px", 
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div className="flex-between">
                  <span style={{ fontWeight: "600", fontSize: "14px", color: "var(--text-primary)" }}>{topic.title}</span>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)" }}>
                    {topic.solved}/{topic.total} ({topic.percent}%)
                  </span>
                </div>
                <ProgressBar value={topic.solved} max={topic.total} height="6px" />
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
