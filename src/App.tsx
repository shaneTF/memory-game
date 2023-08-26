import { useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  console.log("revealedGrid", revealedGrid);

  function handleCardClicked(rowIndex: number, colIndex: number) {
    //reveal the clicked card
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);
    //If 1 card has already been clicked prior
    //If they both match, mark them as answered
    //If they don't match, hide them after 1 second
  }
  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div
                onClick={() => handleCardClicked(rowIndex, colIndex)}
                key={colIndex}
                className="card"
              >
                {revealedGrid[rowIndex][colIndex] ? number : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
