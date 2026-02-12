const gridContainer = document.querySelector("#grid-container");
const gridSizeRangeSlider = document.querySelector("#grid-size-range");
const gridSizeText = document.querySelector("#grid-size-text");
const colorPicker = document.querySelector("#color-picker");
const rainbowButton = document.querySelector("#rainbow-button");
const darkenButton = document.querySelector("#darken-button");
const clearButton = document.querySelector("#clear-button");

function drawGrid(gridSize) {

    const maxGridWidthHeight = 80;
    let divRows = [];
    let divsInRow = [];

    for (let i = 0; i < gridSize; i++) {
        divRows.push(document.createElement("div"));
        divRows[i].style.display = "flex";
        gridContainer.appendChild(divRows[i]);
        for (let j = 0; j < gridSize; j++) {
            divsInRow.push(document.createElement("div"));
            divsInRow[divsInRow.length-1].style.cssText =`
            width: ${maxGridWidthHeight/gridSize}vw;
            max-width: ${maxGridWidthHeight/gridSize/1.25}rem;
            height: ${maxGridWidthHeight/gridSize}vw;
            max-height: ${maxGridWidthHeight/gridSize/1.25}rem;
            border: solid 1px black;`;
            divsInRow[divsInRow.length-1].classList.add("square");
            divRows[i].appendChild(divsInRow[divsInRow.length-1]);
        }
    }
    divRows = [];
    divsInRow = [];
}

function removeGrid() {
    while (gridContainer.firstElementChild) {
        gridContainer.removeChild(gridContainer.lastElementChild);
    }
}

function randomNumberUpTo(number) {
    return Math.floor(Math.random() * number+1);
}

function draw() {

    let color = colorPicker.value;
    let rainbowButtonClicks = 0;
    colorPicker.addEventListener("input", () => {
    color = colorPicker.value;
    })

    rainbowButton.addEventListener("click", () => {
        if (rainbowButton > 1) rainbowButtonClicks = 0;
        rainbowButtonClicks++;
    })

    const squares = document.querySelectorAll(".square");
    
    let holding = false;

    gridContainer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        holding = true;
    });
    gridContainer.addEventListener("mouseup", () => holding = false);
    gridContainer.addEventListener("mouseleave", () => holding = false);

    squares.forEach(square => {
        square.addEventListener("mouseover", (e) => {
            if (holding === true) {
                if (rainbowButtonClicks % 2 === 0) {
                    square.style.backgroundColor = color;
                } else {
                    e.currentTarget.style.backgroundColor = `rgb(${randomNumberUpTo(255)}, ${randomNumberUpTo(255)}, ${randomNumberUpTo(255)})`;
                }
            }
        })
    });
}

function changeGridSize() {
    gridSizeRangeSlider.addEventListener("input", function() {
    gridSize = this.value;
    gridSizeText.innerText = `${gridSize} x ${gridSize}`;
    })

    gridSizeRangeSlider.addEventListener("mouseup", function() {
    removeGrid();
    drawGrid(gridSize);
    draw();
    clear();
    })
}

function clear() {
    const squares = document.querySelectorAll(".square")
    clearButton.addEventListener("click", () => {
        squares.forEach(square => {
            square.style.backgroundColor = "white";
        });
    })
}

function createGrid() {
    let gridSize = gridSizeRangeSlider.value;
    drawGrid(gridSize);
    draw();
    gridSizeText.innerText = `${gridSize} x ${gridSize}`;

    changeGridSize();
    clear();
}

createGrid();

