var sudokuColumn, sudokuRow;
var out = "<table>";
for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
  out += "<tr>";
  for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
    out += "<td";
    if (Math.random() < 0.3) {
      out += ' class="number">';
      out += Math.floor(Math.random() * 9 + 1);
    } else {
      out += ">";
    }
    out += "</td>";
  }
  out += "</tr>";
}
out += "</table>";
document.getElementById("sudokuTable").innerHTML = out;
