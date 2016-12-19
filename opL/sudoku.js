// function that puts all the visible and invisible (null) data
// from some given 2D (9×9) array's indexes into a string
function onScreen (row, column) {
	var tFO = "" + sdkArr[row][column] + sdkLive[row][column];
	return tFO;
}

// function that takes the user's input and changes the drawn table
function sudokuChange (yC, xC, n) {
	sdkLive[yC][xC] = n;
	document.getElementById("sudokuTable").innerHTML = sdkTablePrint(sdkArr, sdkLive);	
}

// function that does all of the work and is too complicated for a single line comment
function sdkPossible (y, x) {
	var alreadyWritten = "";
	// scan the values in the selected td's row
	for (var sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
		alreadyWritten += onScreen(y,sudokuColumn);
	}
	// scan the values in the selected td's column
	for (var sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
		alreadyWritten += onScreen(sudokuRow,x);
	}
	// scan the values in the selected td's 3×3 squarelet
	var i, j;
	for (i = 0; i < 3; i++) {
		sudokuRow = 3 * Math.floor(y / 3) + i;
		for (j = 0; j < 3; j++) {
			sudokuColumn = 3 * Math.floor(x / 3) + j;
			alreadyWritten += onScreen(sudokuRow,sudokuColumn);
		}
	}
	// determine which of the numbers 1-9 are not already present
	// i.e. which numbers are eligible to be printed in the td
	var sdkAccNum = [];
	for (var i = 1; i <= 9; i++) {
		if (alreadyWritten.indexOf(i) == -1) {
			sdkAccNum.push(i);
		}
	}
	// print a table that acts as a control panel
	var outputTbl = "<table class='controls'><tr>";
	for (var i=0; i < sdkAccNum.length; i++) {
		outputTbl += "<td class='controls noNumber' onclick=sudokuChange("+ y + "," + x + "," + sdkAccNum[i] +")>" + sdkAccNum[i] + "</td>";
	}
	// a "delete" button
	outputTbl += "<td class='controls noNumber' onclick=sudokuChange("+ y + "," + x + "," + 0 +")>DEL</td></tr>";
	document.getElementById("sudokuCtrl").innerHTML = outputTbl;
}

// print the array into a readable table, call sdkPossible on empty td click
function sdkTablePrint (fixedArr, liveArr) {
	var out = "<table class='sudoku'>";
	var sudokuRow, sudokuColumn;
	for (sudokuRow = 0; sudokuRow < 9; sudokuRow++) {
		out += "<tr>";
		for (sudokuColumn = 0; sudokuColumn < 9; sudokuColumn++) {
			out += "<td"
			if (fixedArr[sudokuRow][sudokuColumn] != 0) {
				out += ' class="number">';
				out += fixedArr[sudokuRow][sudokuColumn] + "</td>";
			} else {
				out += ' class="noNumber" onclick=sdkPossible(' + sudokuRow + ',' + sudokuColumn + ')>';
				if (liveArr[sudokuRow][sudokuColumn] != 0) {
					out += liveArr[sudokuRow][sudokuColumn];
				}
				out += '</td>';
			}
		}
		out += "</tr>";
	}
	out += "</table>";
	return out;
}

// an array that holds our sudoku's numbers
var sdkArr = [[9, 0, 0, 5, 0, 0, 2, 0, 3],
              [0, 0, 0, 0, 7, 3, 0, 0, 0],
              [4, 0, 5, 0, 0, 0, 9, 0, 0],
              [0, 2, 0, 4, 0, 8, 0, 0, 7],
              [0, 5, 0, 0, 6, 0, 0, 3, 0],
              [6, 0, 0, 7, 0, 2, 0, 4, 0],
              [0, 0, 2, 0, 0, 0, 6, 0, 1],
              [0, 0, 0, 3, 2, 0, 0, 0, 0],
              [8, 0, 1, 0, 0, 7, 0, 0, 5]];
			  
// an empty 9×9 array that holds the numbers from input
var sdkLive = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0],
	       [0, 0, 0, 0, 0, 0, 0, 0, 0]];

document.getElementById("sudokuTable").innerHTML = sdkTablePrint(sdkArr, sdkLive);
