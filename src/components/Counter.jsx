function Counter({ questions }) {
  const solvedCount = questions.filter((q) => q.solved).length;

  return (
    <p>
      Solved: {solvedCount} / {questions.length}
    </p>
  );
}

export default Counter;