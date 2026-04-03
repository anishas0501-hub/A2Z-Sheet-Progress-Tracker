import QuestionList from "../components/QuestionList";
import { useState, useEffect } from "react";

/* ================= CURATED OFFICIAL LIST ================= */

const initialQuestions = [

  // 🟢 EASY
  {
    id: 1,
    title: "Two Sum",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    id: 2,
    title: "Roman to Integer",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/roman-to-integer/"
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    id: 4,
    title: "Palindrome Number",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/palindrome-number/"
  },
  {
    id: 5,
    title: "Reverse Linked List",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    id: 6,
    title: "Add Binary",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/add-binary/"
  },
  {
    id: 7,
    title: "Merge Sorted Array",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-sorted-array/"
  },
  {
    id: 8,
    title: "Degree of an Array",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/degree-of-an-array/"
  },
  {
    id: 9,
    title: "Remove Element",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-element/"
  },
  {
    id: 10,
    title: "Sqrt(x)",
    solved: false,
    difficulty: "Easy",
    link: "https://leetcode.com/problems/sqrtx/"
  },
    // 🟡 MEDIUM
  {
    id: 11,
    title: "3Sum",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum/"
  },
  {
    id: 12,
    title: "Longest Substring Without Repeating Characters",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    id: 13,
    title: "Container With Most Water",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    id: 14,
    title: "Binary Tree Level Order Traversal",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: 15,
    title: "Subsets",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subsets/"
  },
  {
    id: 16,
    title: "Product of Array Except Self",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    id: 17,
    title: "Word Search",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/word-search/"
  },
  {
    id: 18,
    title: "Clone Graph",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/clone-graph/"
  },
  {
    id: 19,
    title: "Search in Rotated Sorted Array",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    id: 20,
    title: "Jump Game",
    solved: false,
    difficulty: "Medium",
    link: "https://leetcode.com/problems/jump-game/"
  },
    // 🔴 HARD
  {
    id: 21,
    title: "Trapping Rain Water",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/trapping-rain-water/"
  },
  {
    id: 22,
    title: "Median of Two Sorted Arrays",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  {
    id: 24,
    title: "Word Ladder",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/word-ladder/"
  },
  {
    id: 25,
    title: "Largest Rectangle in Histogram",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/"
  },
  {
    id: 26,
    title: "N-Queens",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/n-queens/"
  },
  {
    id: 27,
    title: "Sliding Window Maximum",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/sliding-window-maximum/"
  },
  {
    id: 28,
    title: "Edit Distance",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/edit-distance/"
  },
  {
    id: 29,
    title: "Serialize and Deserialize Binary Tree",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    id: 30,
    title: "Maximum Profit in Job Scheduling",
    solved: false,
    difficulty: "Hard",
    link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/"
  },

];

const difficultyOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function Problems() {

  const storedQuestions = localStorage.getItem("questions");

  const [questions, setQuestions] = useState(
    storedQuestions ? JSON.parse(storedQuestions) : initialQuestions
  );

  const [filter, setFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  /* ---------------- CORE FUNCTIONS ---------------- */

  const toggleSolved = (id) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, solved: !q.solved } : q
    );
    setQuestions(updated);
  };

  const filteredQuestions = questions.filter((q) => {

    const solvedMatch =
      filter === "all" ||
      (filter === "solved" && q.solved) ||
      (filter === "unsolved" && !q.solved);

    const difficultyMatch =
      difficultyFilter === "all" ||
      q.difficulty === difficultyFilter;

    const searchMatch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase());

    return solvedMatch && difficultyMatch && searchMatch;
  });

  /* ---------------- PROGRESS ---------------- */

  const totalQuestions = questions.length;
  const solvedCount = questions.filter(q => q.solved).length;

  const easyQuestions = questions.filter(q => q.difficulty === "Easy");
  const mediumQuestions = questions.filter(q => q.difficulty === "Medium");
  const hardQuestions = questions.filter(q => q.difficulty === "Hard");

  const easyPercent = easyQuestions.length
    ? (easyQuestions.filter(q => q.solved).length / easyQuestions.length) * 100
    : 0;

  const mediumPercent = mediumQuestions.length
    ? (mediumQuestions.filter(q => q.solved).length / mediumQuestions.length) * 100
    : 0;

  const hardPercent = hardQuestions.length
    ? (hardQuestions.filter(q => q.solved).length / hardQuestions.length) * 100
    : 0;

  /* ---------------- RENDER ---------------- */

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          color: "#333",
        }}
      >
        <nav style={{ marginBottom: "20px" }}>
            <a
                href="/"
                style={{
                marginRight: "15px",
                textDecoration: "none",
                fontWeight: "bold",
                color: "#4CAF50"
                }}
            >
                Problems
            </a>

            <a
                href="/dashboard"
                style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#FF9800"
                }}
            >
              Dashboard
            </a>
        </nav>
        <h1>DSA Tracker</h1>

        {/* PROGRESS */}
        <h3>Progress</h3>

        <div
          style={{
            height: "20px",
            width: "100%",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <div style={{ width: `${easyPercent}%`, backgroundColor: "#4CAF50" }} />
          <div style={{ width: `${mediumPercent}%`, backgroundColor: "#FF9800" }} />
          <div style={{ width: `${hardPercent}%`, backgroundColor: "#F44336" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          Easy: {easyPercent.toFixed(0)}% |
          Medium: {mediumPercent.toFixed(0)}% |
          Hard: {hardPercent.toFixed(0)}%
        </div>

        {/* STATS */}
        <h3>Stats</h3>
        <p>Total: {totalQuestions}</p>
        <p>Solved: {solvedCount}</p>
        <p>Unsolved: {totalQuestions - solvedCount}</p>

        {/* SEARCH */}
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "15px",
          }}
        />

        {/* FILTERS */}
        <h3>Filters</h3>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="all">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* QUESTION LIST */}
        <QuestionList
          filteredQuestions={filteredQuestions}
          toggleSolved={toggleSolved}
        />

      </div>
    </div>
  );
}

export default Problems; 