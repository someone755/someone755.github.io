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
var timeEndScript = performance.now(); // check line 1 for timeStartScript
var timeOut = "Table loaded in ";
timeOut += Math.round((timeEndScript - timeStartScript)*1e6)/1e6; // round delta off to 6 decimal places
timeOut += " ms";
document.getElementById("scriptTimer").innerHTML = timeOut;

var input = Number(prompt("Enter a number [1-9]")) - 1;
// Reusing an old unused variable saves some memory.
tableOut = "<p>" + "You selected number " + (input + 1) + ". Here are the contents of the elements with that index:<br>";
tableOut += "Row: ";
/*
 * Yes, we're scanning the individual rows, but to do
 * that we need to scan each column of the chosen row.
 */
for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
  if (sudokuArray[input][sudokuColumn] != 0) {
    tableOut += sudokuArray[input][sudokuColumn] + " ";
  }
}
tableOut += "<br>Column: ";
/*
 * Similar as before, we're scanning the given column
 * by fetching the data of each <td> in that column.
 * We move down the rows; The column index is static.
 */
for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
  if (sudokuArray[sudokuRow][input] != 0) {
    tableOut += sudokuArray[sudokuRow][input] + " ";
  }
}
tableOut += "<br>3x3 square: "
/*
 * Alright buckle up kids, this is a hardcore motherfucker.
 * We need two variables to count over each of the 3x3 grid's
 * two axes and thus collect all 9 <td>s.
 * First, we find which row this is happening in, so imagine that our
 * 9x9 grid (array) is composed of 9 individual 3x3 squarelets, like
 * in this diagram:
 *  _ _ _
 * |0|1|2|   Each of these squarelets is further divided into 9 <td>s,
 * |3|4|5|   and if we can find the squarelet that the user's input is
 * |4|7|8|   referencing, we can easily determine which rows and
 *           columns we need to scan.
 * We'll start off by finding the row where our squarelet starts. For
 * any input from the 0-8 range (remember that input=prompt() minus
 * one!), it is true that the starting row of our squarelet is subject
 * to input's division by three. Using Math.floor(), the possible
 * outcomes of this division are then 0, 1, and 2. Multiply that by 3
 * and you get 0, 3, and 6, which are all the possible rows in which
 * a squarelet may start.
 * It is then true that our starting sudoku row equals:
 *****************************************
 * sudokuRow = 3 * Math.floor(input / 3) *
 *****************************************
 * We then need to find the starting column of our 3x3 block. To
 * achieve this, we need to look at the division remainder of
 * "input / 3", using the operator %, or modulus. For any input from
 * the 0-8 range (again, prompt != input), the possible resuts are
 * 0, 1, and 2. After multiplying this by 3, you get 0, 3, and 6,
 * which are the only possible column indexes where a squarelet may
 * begin. From this, we can expand:
 **********************************
 * sudokuColumn = 3 * (input % 3) *
 **********************************
 * That said, it is imperative we realize that the two sequences
 * (0, 3, 6) do not have the same meaning, despite the same numbering.
 * As an example, for input = 7, one equation returns sudokuRow = 6,
 * but the other returns sudokuColumn = 3.
 * Given all of the above, we create two nested 'for' loops. The outer
 * one fixates and increments the row number (first index of the
 * array), and the inner one increments the column number (second
 * index of the array).
 * Inside the inner 'for' loop, we print the array elements with the
 * indexes sudokuRow and sudokuColumn, respectively. We simply print
 * this out as:
 ****************************************
 * sudokuArray[sudokuRow][sudokuColumn] *
 ****************************************
 * and we're done with our scanning.
 */
var i;
/*
 * Just like before, using an old unused variable to save memory.
 * Gotta practice for 128K microcontrollers.
 */
for (timeOut = 0; timeOut < 3; timeOut++) {
  sudokuRow = 3 * Math.floor(input / 3) + timeOut;
  for (i=0; i<3; i++) {
  sudokuColumn = (input % 3) * 3 + i;
    /*
     * We don't want to print empty table data, so we make sure only
     * those bigger than 0 make it into the final string with this if.
     */
    if (sudokuArray[sudokuRow][sudokuColumn] != 0) {
      tableOut += sudokuArray[sudokuRow][sudokuColumn] + " ";
    }
  }
}
// Print this fucker.
document.getElementById("sudokuPrompt").innerHTML = tableOut;
