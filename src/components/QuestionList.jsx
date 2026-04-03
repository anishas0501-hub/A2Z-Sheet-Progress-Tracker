function QuestionList({ filteredQuestions, toggleSolved, deleteQuestion }) {

  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <>
      {difficulties.map((level) => {

        const questionsByLevel = filteredQuestions.filter(
          (q) => q.difficulty === level
        );

        if (questionsByLevel.length === 0) return null;

        return (
          <div key={level} style={{ marginBottom: "25px" }}>

            {/* Section Header */}
            <h3
              style={{
                color:
                  level === "Easy"
                    ? "green"
                    : level === "Medium"
                    ? "orange"
                    : "red",
              }}
            >
              {level}
            </h3>

            {questionsByLevel.map((q) => (
              <div
                key={q.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Left Side */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                  {/* Difficulty Dot */}
                  <span
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      backgroundColor:
                        q.difficulty === "Easy"
                          ? "green"
                          : q.difficulty === "Medium"
                          ? "orange"
                          : "red",
                      display: "inline-block"
                    }}
                  ></span>

                  {/* Clickable Title */}
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!q.link) e.preventDefault();
                      }}
                    style={{
                    textDecoration: "none",
                    color: q.solved ? "#888" : "#333",
                    fontWeight: "bold",
                    }}
                  >
                    {q.title}
                  </a>

                </div>

                {/* Right Side Circle Button */}
                <button
                  onClick={() => toggleSolved(q.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: q.solved ? "none" : "2px solid #ccc",
                    backgroundColor: q.solved ? "#4CAF50" : "white",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "0.2s ease",
                  }}
                >
                  {q.solved && "✓"}
                </button>

              </div>
            ))}

          </div>
        );
      })}
    </>
  );
}

export default QuestionList;