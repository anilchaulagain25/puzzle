(function () {
    //Variables declarations
    const tableEm = document.getElementById("tableHtml");
    const ddlDimension = document.getElementById("ddlDimension");
    const showCongratsEm = document.getElementById("showCongrats");
    const stepsEm = document.getElementById("steps");
    let isGameDone = false;
    let steps = 0;
    //Dimension of the game
    let dimension = parseInt(Utils.getParameterByName("dimension")) || 4;
    if (dimension < 2 || dimension > 8) dimension = 4;
    ddlDimension.value = String(dimension);
    //Temp grid to fill initial elements
    let tempGrid = Array.from(Array(dimension * dimension).keys());
    //Remove first elements
    tempGrid.shift();
    //Shuffle given elemnts
    //tempGrid = Utils.shuffle(tempGrid);

    //For empty space - Random space
    let nullRow = Utils.getRandom(0, dimension);
    let nullColumn = Utils.getRandom(0, dimension);

    let grid = [];

    //Fill actual grid with temporary grid
    grid = Utils.fillGrid(nullRow, nullColumn, dimension, tempGrid);

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

    window.moveItemByActionAndRerenderTable = function (action) {
        if (isGameDone === false) {
            stepsEm.innerHTML = ++steps;
            grid = Utils.move(grid, action);
            //get html from grid array
            const html = Utils.convertGridToHtmlTable(grid);

            //init load
            tableEm.innerHTML = html;
            const merged = [].concat.apply([], grid);
            if (Utils.isGameDone(merged)) {
                isGameDone = true;
                showCongratsEm.style.display = "inline";
            }
        }
    }
    tableEm.addEventListener("swl", () => {
        moveItemByActionAndRerenderTable("left");
    }, false);
    tableEm.addEventListener("swr", () => {
        moveItemByActionAndRerenderTable("right");
    }, false);
    tableEm.addEventListener("swd", () => {
        moveItemByActionAndRerenderTable("down");
    }, false);
    tableEm.addEventListener("swu", () => {
        moveItemByActionAndRerenderTable("up");
    }, false);

    window.changeDimension = function () {
        const redirect = () => {
            const di = ddlDimension.value;
            window.location.href = "/?dimension=" + di;
        }
        if (steps > 0) {
            if (confirm("do you want to exit game")) {
                redirect();
            }
        } else {
            redirect();
        }


    }
    window.tryNext = function (event) {
        event.preventDefault();
        window.location.href = "/?dimension=" + (parseInt(dimension) + 1);
    }
}())
