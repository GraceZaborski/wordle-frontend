// import { dailyWord } from "../.././App";
import { useGlobalContext } from "../../utils/GlobalContext";

function OutputGrid() {
  const dailyWord = "react";

  let grid = document.getElementById("grid") as HTMLElement;

  const { word, wordArray } = useGlobalContext();

  buildGrid();
  updateGrid();

  function buildGrid() {
    console.log("building grid");
    if (grid) {
      if (document.getElementsByClassName("cell").length < 30) {
        for (let i = 0; i < 6; i++) {
          let row = document.createElement("div");
          for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = "";
            row.appendChild(cell);
          }
          grid.appendChild(row);
        }
      }
    }
  }

  function updateGrid() {
    console.log("upgrading grid");
    if (grid) {
      let row = grid.firstChild;
      for (let attempt of wordArray) {
        console.log("wordArray in updateGrid" + wordArray);
        drawAttempt(row, attempt, false);
        if (row) {
          row = row.nextSibling;
        }
      }
      drawAttempt(row, word, true);
      if (row) {
        row = row.nextSibling;
        for (let i = wordArray.length + 1; i < 7; i++) {
          if (row) {
            updateWhiteSpace(row);
            row = row.nextSibling;
          }
        }
      }
    }
  }

  function updateWhiteSpace(row: any) {
    console.log("updating white spaces");
    for (let i = 0; i < 5; i++) {
      let cell = row.children[i];
      cell.textContent = "";
      cell.style.backgroundColor = "#FFFFFF";
    }
  }

  function drawAttempt(row: any, attempt: string, isCurrent: boolean) {
    for (let i = 0; i < 5; i++) {
      let cell = row.children[i];
      if (attempt[i] !== undefined && isCurrent === true) {
        cell.textContent = attempt[i];
        cell.style.backgroundColor = "#808080";
      } else if (attempt[i] !== undefined && isCurrent === false) {
        cell.textContent = attempt[i];
        cell.style.backgroundColor = getBgColor(attempt, i);
      } else {
        // lol
        cell.style.backgroundColor = "#FFFFFF";
        cell.textContent = "";
        // cell.innerHTML = '<div style="opacity: 0">X</div>'
      }
    }
  }

  function getBgColor(attempt: string, i: number) {
    let correctLetter = dailyWord[i];
    let attemptLetter = attempt[i];
    if (
      attemptLetter === undefined ||
      dailyWord.indexOf(attemptLetter) === -1
    ) {
      return "#808080";
    }
    if (correctLetter === attemptLetter) {
      return "#538d4e";
    }
    return "#b59f3b";
  }

  return <div id="grid"></div>;
}

export default OutputGrid;
