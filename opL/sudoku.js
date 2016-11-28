var timeStartScript = performance.now();
/*
 *  Introduce an array from which
 *  we'll pull data for our sudoku.
 */
var sudokuArray = [[0, 5, 0, 0, 5, 0, 4, 0, 0], //row 1
                   [0, 0, 0, 0, 6, 0, 0, 0, 1], //row 2
                   [4, 3, 0, 0, 0, 0, 0, 0, 0], // ...
                   [8, 0, 0, 0, 0, 0, 3, 0, 0],
                   [0, 0, 7, 0, 1, 6, 6, 3, 0],
                   [3, 0, 0, 0, 3, 0, 3, 0, 0],
                   [0, 0, 3, 1, 5, 0, 0, 1, 0],
                   [7, 3, 0, 0, 3, 0, 8, 0, 0],
                   [0, 0, 7, 0, 0, 0, 0, 0, 0]] //row 9
var sudokuColumn, sudokuRow;
var tableOut = "<table>";
for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
  tableOut += "<tr>";
  for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
    tableOut += "<td";
    if (sudokuArray[sudokuRow][sudokuColumn] != 0) {
      tableOut += ' class="number">';
      tableOut += sudokuArray[sudokuRow][sudokuColumn];
    } else {
      tableOut += ">";
    }
    tableOut += "</td>";
  }
  tableOut += "</tr>";
}
tableOut += "</table>";
document.getElementById("sudokuTable").innerHTML = tableOut;
var timeEndScript = performance.now();
var timeOut = "Page loaded in ";
timeOut += Math.round((timeEndScript - timeStartScript)*1e6)/1e6;
timeOut += " ms";
document.getElementById("scriptTimer").innerHTML = timeOut;
