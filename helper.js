//Utils Functions
const Utils = {

    //Fill grid with 
    fillGrid: (nullRow, nullColumn, numbers) => {
        let result = [];
        let indexer = 0;
        for (let i = 0; i < dimension; i++) {
            const tempArr = [];
            for (let j = 0; j < dimension; j++) {
                if (i === nullRow && j === nullColumn)
                    tempArr.push(null);
                else
                    tempArr.push(numbers[indexer++]);
            }
            result.push(tempArr);
        }
        return result;
    },

    //Move given array based on action
    move: (grid, action) => {
        let loopBreak = false;
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j] === null) {
                    if (action === "left") {
                        if (j + 1 < row.length) {
                            row[j] = row[j + 1];
                            row[j + 1] = null;
                        }
                    } else if (action === "right") {
                        if (j !== 0) {
                            row[j] = row[j - 1];
                            row[j - 1] = null;
                        }
                    } else if (action === "up") {
                        if (i + 1 < grid.length) {
                            grid[i][j] = grid[i + 1][j];
                            grid[i + 1][j] = null;
                        }
                    }
                    else if (action === "down") {
                        if (i != 0) {
                            grid[i][j] = grid[i - 1][j];
                            grid[i - 1][j] = null;
                        }
                    }
                    loopBreak = true;
                    break;
                }
            }
            if (loopBreak) break;
        }
        return grid;
    },

    //Convert Grid to HTML
    convertGridToHtmlTable: (grid) => {
        let html = "<table><tbody>";
        grid.forEach(row => {
            html += "<tr>";
            row.forEach(col => {
                html += "<td>";
                html += col || "";
                html += "</td>";
            })
            html += "</tr>";
        })
        html += "</tbody></table>";
        tableEm.innerHTML = html;
        return html;
    },

    //Shuffle given array
    shuffle: (array) => {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    },

    //Get random number from given range
    getRandom: (min, max) => {
        return Math.floor(Math.random() * max) + min;
    },
    getParameterByName: (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

}