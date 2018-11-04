
const row = 8
const col = 5

let bitimg = document.getElementById('bitimage');
let binary = document.getElementById('binary');

let tile = new Array(row);

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
    binary.innerHTML = toBinaryString(tile[0]) + " " + toHexString(tile[0]);
}

function toBinaryString(tileArr) {
    let bin_str = '000';
    for (let i = 0; i < tileArr.length; i++) {
	bin_str = bin_str + String(tileArr[i].onoff);
    }
    return bin_str;
}

function toHexString(tileArr) {
    let hex_str = '0x';
    let hex_num = 0;
//    let hex_let = '';
    
    hex_str = hex_str + tileArr[0].onoff;
    
    for (let i = 1; i < tileArr.length; i++) {
	hex_num += tileArr[i].onoff * 2 ** (4-i)
    }

    switch(hex_num) {
    case 10:
	hex_num = 'A';
    case 11:
	hex_num = 'B';
    case 12:
	hex_num = 'C';
    case 13:
	hex_num = 'D';
    case 14:
	hex_num = 'E';
    case 15:
	hex_num = 'F';
    }
    
    return hex_str + hex_num;
}
