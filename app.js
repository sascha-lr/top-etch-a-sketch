const body = document.querySelector("body");

const maxGridWidthHeight = 32;
const divRows = [];
const divsInRow = [];

createGrid(32);

const squares = document.querySelectorAll(".square");

function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        divRows.push(document.createElement("div"));
        divRows[i].style.display = "flex";
        body.appendChild(divRows[i]);
        for (let j = 0; j < gridSize; j++) {
            divsInRow.push(document.createElement("div"));
            divsInRow[divsInRow.length-1].style.width = `${maxGridWidthHeight/gridSize}rem`;
            divsInRow[divsInRow.length-1].style.height = `${maxGridWidthHeight/gridSize}rem`;
            divsInRow[divsInRow.length-1].style.border = "solid 1px black";
            divsInRow[divsInRow.length-1].classList.add("square");
            divRows[i].appendChild(divsInRow[divsInRow.length-1]);
        }
    }
}

squares.forEach(square => {
    square.addEventListener("mouseover", (e) => {
        square.style.backgroundColor = "black";
    })
});