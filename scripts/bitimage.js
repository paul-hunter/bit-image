
const row = 8
const col = 5

let bitimg = document.getElementById('bitimage');

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
}
