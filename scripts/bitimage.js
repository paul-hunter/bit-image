
const row = 8
const col = 5

let binary = document.getElementById('binary');

let tile = new Array(row);
let binArr = new Array(row);

//creation of 2d array
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
	    tile[i][j].style.top = 100 + i * 55;
	    tile[i][j].style.left = 75 + j * 55;
	    tile[i][j].rowcol = [i, j];
	    tile[i][j].onoff = 0;
	    tile[i][j].addEventListener('mousedown', click);
	    document.body.appendChild(tile[i][j]);
	}
    }
    for (let i = 0; i < row; i++) {
	//create binary/hex strings
	binArr[i] = document.createElement('p');
	binArr[i].style = 'position:absolute'
	binArr[i].style.top = 100 + i * 55;
	binArr[i].style.left = 400;
	binArr[i].innerHTML = toBinaryString(tile[i]) + " " + toHexString(tile[i]);
	document.body.appendChild(binArr[i])
    }
}

function click(event) {
    let source = event.target;
    if (source.onoff === 0) {
	source.src = 'images/black.svg';
	source.onoff = 1;
    }
    else {
	source.src = 'images/white.svg';
	source.onoff = 0;
    }
    let sourceRow = source.rowcol[0];
    binArr[sourceRow].innerHTML = toBinaryString(tile[sourceRow]) + " " + toHexString(tile[sourceRow]);
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
