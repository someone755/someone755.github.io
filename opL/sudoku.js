var timeStartScript = performance.now();
var sudokuColumn, sudokuRow;
var tableOut = "<table>";
for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
  tableOut += "<tr>";
  for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
    tableOut += "<td";
    if (Math.random() < 0.3) {
      tableOut += ' class="number">';
      tableOut += Math.floor(Math.random() * 9 + 1);
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
console.log(timeOut);
