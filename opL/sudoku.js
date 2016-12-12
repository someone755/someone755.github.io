// an array that holds our sudoku's numbers
var sdkArr = [[0, 5, 0, 0, 5, 0, 4, 0, 0], /* row 1 */
              [0, 0, 0, 0, 6, 0, 0, 0, 1], /* row 2 */
              [4, 3, 0, 0, 0, 0, 0, 0, 0], /*  ... */
              [8, 0, 0, 0, 0, 0, 3, 0, 0],
              [0, 0, 7, 0, 1, 6, 6, 3, 0],
              [3, 0, 0, 0, 3, 0, 3, 0, 0],
              [0, 0, 3, 1, 5, 0, 0, 1, 0],
              [7, 3, 0, 0, 3, 0, 8, 0, 0],
              [0, 0, 7, 0, 0, 0, 0, 0, 0]]; /* row 9 */

// print the array into a readable table
function sdkTablePrint (sdkArrFunc) {
	// print the table
	var out = "<table>";
	var sudokuRow, sudokuColumn;
	var i = 0;
	for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
		out += "<tr>";
		for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
			out += "<td id=cell" + i
			if (sdkArrFunc[sudokuRow][sudokuColumn] != 0) {
				out += ' class="number">';
				out += sdkArrFunc[sudokuRow][sudokuColumn] + "</td>";
			} else {
				out += ' class="noNumber" onclick=sdkScan(this)></td>';
			}
			i++
		}
		out += "</tr>";
	}
	out += "</table>";
	return out;
}

// function that finds the values a clicked td can accept
function sdkAWNegative (array) {
	var sdkAccNum = [];
	var i;
	for (i = 1; i <= 9; i++) {
		if (array.indexOf(i) == -1) {
			sdkAccNum.push(i);
		}
	}
	return String(sdkAccNum);
}

// function that does all of the work and is too complicated for a single line comment
function sdkScan (td) {
	var sdkTdId = td.id;
	sdkTdId = Number(sdkTdId.replace(/\D/g,''));
	console.log(sdkTdId);
	
	var sdkAlreadyWritten = [];
	var sudokuColumn;
	// scan and save the values in the selected td's row
	var sudokuRow = Math.floor(sdkTdId/9);
	for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
		if (sdkArr[sudokuRow][sudokuColumn] != 0) {
			sdkAlreadyWritten.push(sdkArr[sudokuRow][sudokuColumn]);
		}
	}
	// scan and save the values in the selected td's column
	sudokuColumn = sdkTdId % 9;
	for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
		if (sdkArr[sudokuRow][sudokuColumn] !=0) {
			sdkAlreadyWritten.push(sdkArr[sudokuRow][sudokuColumn]);
		}
	}
	// scan and save the values in the selected td's squarelet
	var i, j;
	sdkSqrltRow = Math.floor(sdkTdId/27);
	sdkSqrltClmn = Math.floor((sdkTdId % 9)/3);
	for (i = 0; i < 3; i++) {
		sudokuRow = 3 * sdkSqrltRow + i;
		for (j = 0; j < 3; j++) {
			sudokuColumn = 3 * sdkSqrltClmn + j;
			if (sdkArr[sudokuRow][sudokuColumn] != 0) {
				sdkAlreadyWritten.push(sdkArr[sudokuRow][sudokuColumn]);
			}
		}
	}
	var outputMsg = "Possible candidates for selected td are: "
	outputMsg += sdkAWNegative(sdkAlreadyWritten);
	document.getElementById("sudokuPrompt").innerHTML = outputMsg;	
}

document.getElementById("sudokuTable").innerHTML = sdkTablePrint(sdkArr);
