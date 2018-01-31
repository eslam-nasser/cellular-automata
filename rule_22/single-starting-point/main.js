/*
Name: Cellular Automata
Rule: #22
URL: http://atlas.wolfram.com/01/01/22/
Made By: 
    - https://codepen.io/eslam-nasser/
    - https://codepen.io/heshamabdulzaher/
    - https://codepen.io/amradeata/
*/

// Set some initial valuse
var cellDimensions = 5; // set any value you want (grid resolution)

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var howManyCellsInRow = Math.floor(windowWidth / (cellDimensions - 1));
var howManyRows = Math.floor(windowHeight / (cellDimensions - 1))
var grid = document.getElementById('grid')

// Set the initial row
var initRow = document.createElement('div');
initRow.classList = 'row init-row';
grid.appendChild(initRow);
createCellsForRow(initRow)
// Clone the initial row
cloneRow(initRow)

// Generate grid
generateGrid(howManyRows)


// Generate rows of the grid
function generateGrid(rowsNumber) {
    for (var i = 0; i < rowsNumber; i++) {
        var lastRowInGrid = grid.lastChild.cloneNode(true);
        cloneRow(lastRowInGrid)
    }
}

// Create new Row
function createRow() {
    var row = document.createElement('div');
    row.classList = 'row';
    grid.appendChild(row);
    createCellsForRow(row)
}

// Create cells
function createCellsForRow(row) {
    for (var i = 0; i < howManyCellsInRow; i++) {
        var cell = document.createElement('span');
        cell.classList = 'cell';
        cell.style.width = cellDimensions + 'px';
        cell.style.height = cellDimensions + 'px';
        if (i == Math.round(howManyCellsInRow / 2)) {
            cell.classList += ' active'
        }
        row.appendChild(cell);
    }
}

// Clone Row
function cloneRow(row) {
    var cloned = row.cloneNode(true);
    cloned.classList = 'row'
    setTimeout(function () {
        // append to grid
        grid.appendChild(cloned)

        // process cloned cells
        doMagic(cloned)
    }, 1000)
}


// Create random binary
function getRandom() {
    return Math.round(Math.random())
}


// Processing to cells
function doMagic(clonedRow) {
    var clonedCellsArray = Array.prototype.slice.call(clonedRow.children);
    var prevCellsArray = clonedRow.previousSibling.children;

    for (var i = 0; i < clonedCellsArray.length; i++) {
        var index = getElementIndex(clonedCellsArray[i]);
        var current = clonedCellsArray[i];
        // Get prev cells
        var top_left = prevCellsArray[index - 1];
        if (top_left === undefined) {
            top_left = prevCellsArray[prevCellsArray.length - 1];
        }

        var top_center = prevCellsArray[index];

        var top_right = prevCellsArray[index + 1];
        if (top_right === undefined) {
            top_right = prevCellsArray[0];
        }


        // Check prev cells status
        var left_status = top_left.classList.contains('active')
        var center_status = top_center.classList.contains('active')
        var right_status = top_right.classList.contains('active')

        // Apply ruls
        if ( // Rule #1
            left_status == true &&
            center_status == true &&
            right_status == true
        ) {
            current.classList = 'cell';
        }
        if ( // Rule #2
            left_status == true &&
            center_status == true &&
            right_status == false
        ) {
            current.classList = 'cell';
        }
        if ( // Rule #3
            left_status == true &&
            center_status == false &&
            right_status == true
        ) {
            current.classList = 'cell';
        }
        if ( // Rule #4
            left_status == true &&
            center_status == false &&
            right_status == false
        ) {
            current.classList = 'cell active';
        }
        if ( // Rule #5
            left_status == false &&
            center_status == true &&
            right_status == true
        ) {
            current.classList = 'cell';
        }
        if ( // Rule #6
            left_status == false &&
            center_status == true &&
            right_status == false
        ) {
            current.classList = 'cell active';
        }
        if ( // Rule #7
            left_status == false &&
            center_status == false &&
            right_status == true
        ) {
            current.classList = 'cell active';
        }
        if ( // Rule #8
            left_status == false &&
            center_status == false &&
            right_status == false
        ) {
            current.classList = 'cell';
        }
    }
}





function getElementIndex(elm) {
    var element_parent = elm.parentNode;
    var nodes = Array.prototype.slice.call(element_parent.children);
    var i = nodes.indexOf(elm);
    return i;
} 