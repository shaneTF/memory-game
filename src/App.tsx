/**
 * Potential Additons
 *  Changeable grid size UI
 *  Fix ability to freely click on as many cards as you want before they are hidden again.
 */

import { useState } from "react";
import "./App.css";

type TCell = {
  row: number;
  col: number;
};

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

  const [previousClick, setPreviousClick] = useState<TCell | undefined>();

  function handleCardClicked(rowIndex: number, colIndex: number) {
    //reveal the clicked card
    if (revealedGrid[rowIndex][colIndex]) return;
    const clickedNumber = grid[rowIndex][colIndex];
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.col];
      // second click of the 2 clicks

      //If they don't match, hide them after 1 second
      if (previousClickNumber !== clickedNumber) {
        setTimeout(() => {
          newRevealedGrid[rowIndex][colIndex] = false;
          newRevealedGrid[previousClick.row][previousClick.col] = false;
          setRevealedGrid([...newRevealedGrid]);
        }, 1000);
      } else {
        // check if everything has been revealed, then show an alert
        const hasWon = revealedGrid.flat().every((isRevealed) => isRevealed);
        if (hasWon) {
          setTimeout(() => {
            alert("You Won!");
          });
        }
      }

      setPreviousClick(undefined);
    } else {
      // first click of the 2 clicks
      setPreviousClick({
        row: rowIndex,
        col: colIndex,
      });
    }
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
                className={
                  "card " + (revealedGrid[rowIndex][colIndex] ? "revealed" : "")
                }
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
