
const row = 8
const col = 5

let code = document.getElementById('code');
let arrName = document.getElementById('arrname');

let tile = new Array(row);
let binArr = new Array(row);

// Creation of 2d array
for (let i = 0; i < tile.length; i++) {
    tile[i] = new Array(col);
}

init();

function init() {
    for (let i = 0; i < row; i++) {
	for (let j = 0; j < col; j++) {
	    tile[i][j] = document.createElement('img');
	    tile[i][j].src = 'images/white.svg';
	    tile[i][j].style = 'position:absolute; height:50px; width: 50px';
	    tile[i][j].style.top = 60 + i * 55;
	    tile[i][j].style.left = 75 + j * 55;
	    tile[i][j].rowcol = [i, j];
	    tile[i][j].onoff = 0;
	    tile[i][j].addEventListener('mousedown', click);
	    document.body.appendChild(tile[i][j]);
	}
    }
    for (let i = 0; i < row; i++) {
	// Creates binary/hex strings
	binArr[i] = document.createElement('p');
	binArr[i].style = 'position:absolute'
	binArr[i].style.top = 60 + i * 55;
	binArr[i].style.left = 400;
	binArr[i].innerHTML = toBinaryString(tile[i]) + " " + toHexString(tile[i]);
	document.body.appendChild(binArr[i])
    }

    // Initial code creation
    code.value = toCodeString(tile);
    
    // If user changes array name input box, update code appropriately
    arrName.addEventListener("input", function () {
	code.value = toCodeString(tile);
    });
}

function click(event) {
    let source = event.target;
    switchTile(source);

    // Updates binary/hex strings
    let sourceRow = source.rowcol[0];
    updateString(sourceRow);

    // Updates code
    code.value = toCodeString(tile);
}

function switchTile(square) {
    if (square.onoff === 0) {
	square.src = 'images/black.svg';
	square.onoff = 1;
    }
    else {
	square.src = 'images/white.svg';
	square.onoff = 0;
    }
}

function invert() {
    for (let i = 0; i < row; i++) {
	for (let j = 0; j < col; j++) {
	    switchTile(tile[i][j]);
	}
	// Updates binary/hex strings
	updateString(i);
    }
    // Updates code
    code.value = toCodeString(tile);
}

function reset() {
    for (let i = 0; i < row; i++) {
	for (let j = 0; j < col; j++) {
	    if (tile[i][j].onoff === 1) {
		switchTile(tile[i][j]);
	    }
	}
	// Updates binary/hex strings
	updateString(i);
    }
    // Updates code
    code.value = toCodeString(tile);
}

function toCodeString(tileArr) {
    codeString = 'char ' + arrName.value + '[8] = {\n';
    for (let i = 0; i < row; i++) {
	codeString = codeString + "    " + toHexString(tile[i]) + ',\n';
    }
    codeString = codeString + '};'
    return codeString;
}

function updateString(row) {
    binArr[row].innerHTML = toBinaryString(tile[row]) + " " + toHexString(tile[row]);
}

function toBinaryString(tileArr) {
    // First 3 bits aren't needed, just buffer as 0
    let bin_str = '000'; 
    for (let i = 0; i < tileArr.length; i++) {
	bin_str = bin_str + String(tileArr[i].onoff);
    }
    return bin_str;
}

function toHexString(tileArr) {
    let hex_str = '0x';
    let hex_num = 0;
    hex_str = hex_str + tileArr[0].onoff;
    
    for (let i = 1; i < tileArr.length; i++) {
	hex_num += tileArr[i].onoff * 2 ** (4-i);
    }

    let hex_let = '' + hex_num;
    
    switch(hex_num) {
    case 10:
	hex_let = 'A';
	break;
    case 11:
	hex_let = 'B';
	break;
    case 12:
	hex_let = 'C';
	break;
    case 13:
	hex_let = 'D';
	break;
    case 14:
	hex_let = 'E';
	break;
    case 15:
	hex_let = 'F';
	break;
    }

    return hex_str + hex_let;
}
