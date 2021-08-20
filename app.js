//Variables declarations
const tableEm = document.getElementById("tableHtml");
//Dimension of the game
let dimension = parseInt(Utils.getParameterByName("dimension")) || 4;
if (dimension < 2 || dimension > 8) dimension = 4;

//Temp grid to fill initial elements
let tempGrid = Array.from(Array(dimension * dimension).keys());
//Remove first elements
tempGrid.shift();
//Shuffle given elemnts
tempGrid = Utils.shuffle(tempGrid);

//For empty space - Random space
let nullRow = Utils.getRandom(0, dimension);
let nullColumn = Utils.getRandom(0, dimension);

let grid = [];

//Fill actual grid with temporary grid
grid = Utils.fillGrid(nullRow, nullColumn, tempGrid);

//get html from grid array
const html = Utils.convertGridToHtmlTable(grid);

//init load
tableEm.innerHTML = html;

window.addEventListener('keydown', function (event) {
    let action = "";
    switch (event.key) {
        case "ArrowLeft":
            action = "left";
            break;
        case "ArrowRight":
            action = "right";
            break;
        case "ArrowUp":
            action = "up";
            break;
        case "ArrowDown":
            action = "down";
            break;
    }
    moveItemByActionAndRerenderTable(action);
});

function moveItemByActionAndRerenderTable(action) {
    grid = Utils.move(grid, action);
    //get html from grid array
    const html = Utils.convertGridToHtmlTable(grid);

    //init load
    tableEm.innerHTML = html;

}