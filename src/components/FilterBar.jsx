function FilterBar({ setFilter }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <button onClick={() => setFilter("all")}>Show All</button>
      <button onClick={() => setFilter("solved")} style={{ marginLeft: "5px" }}>
        Show Solved
      </button>
      <button onClick={() => setFilter("unsolved")} style={{ marginLeft: "5px" }}>
        Show Unsolved
      </button>
    </div>
  );
}

export default FilterBar;