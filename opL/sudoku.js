var timeStartScript = performance.now();
/*
 * Introduce a (random) array from which
 * we'll pull data for our sudoku.
 */
var sudokuArray = [[0, 5, 0, 0, 5, 0, 4, 0, 0], /* row 1 */
                   [0, 0, 0, 0, 6, 0, 0, 0, 1], /* row 2 */
                   [4, 3, 0, 0, 0, 0, 0, 0, 0], /*  ... */
                   [8, 0, 0, 0, 0, 0, 3, 0, 0],
                   [0, 0, 7, 0, 1, 6, 6, 3, 0],
                   [3, 0, 0, 0, 3, 0, 3, 0, 0],
                   [0, 0, 3, 1, 5, 0, 0, 1, 0],
                   [7, 3, 0, 0, 3, 0, 8, 0, 0],
                   [0, 0, 7, 0, 0, 0, 0, 0, 0]]; /* row 9 */
var sudokuColumn, sudokuRow; // self-explanatory var names
var tableOut = "<table>"; // declare tableOut where we'll write the table to
/*
 * Nested for loops that go over (1) each column
 * and (2) each row. The sudokuRow loop starts
 * the table rows with <tr>s while sudokuColumn
 * draws column entries for the given sudokuRow.
 */
for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
  tableOut += "<tr>";
  for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
    tableOut += "<td";
    /*
     * An if loop that makes sure we don't print empty
     * (null, 0) data into the table and helps color
     * <td> backgrounds with the help of CSS classes.
     */
    if (sudokuArray[sudokuRow][sudokuColumn] != 0) {
      tableOut += ' class="number">';
      tableOut += sudokuArray[sudokuRow][sudokuColumn];
    } else {
      tableOut += ">";
    } // close if
    tableOut += "</td>";
  } // close inner for loop
  tableOut += "</tr>";
} // close outer for loop
tableOut += "</table>";
document.getElementById("sudokuTable").innerHTML = tableOut; // use innerHTML to print the table
/*
 * Calculate time from start of script to when
 * the table has finished loading/generating.
 */
var timeEndScript = performance.now();
var timeOut = "Page loaded in ";
timeOut += Math.round((timeEndScript - timeStartScript)*1e6)/1e6;  // check line 1 for timeStartScript
timeOut += " ms";
document.getElementById("scriptTimer").innerHTML = timeOut;
