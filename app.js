const gridContainer = document.querySelector("#grid-container");
const gridSizeRangeSlider = document.querySelector("#grid-size-range");
const gridSizeText = document.querySelector("#grid-size-text");
const colorPicker = document.querySelector("#color-picker");
const rainbowButton = document.querySelector("#rainbow-button");
const darkenButton = document.querySelector("#darken-button");
const eraserButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");
let squares = document.querySelectorAll(".square");

let isHoldingMouse = false;
let gridSize = gridSizeRangeSlider.value;

function drawGrid(gridSize) {
    const maxGridWidthHeight = 70;
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
            background-color: var(--square-bg-color);
            filter: brightness(100%);`;
            divsInRow[divsInRow.length-1].classList.add("square");
            divRows[i].appendChild(divsInRow[divsInRow.length-1]);
        }
    }
    squares = document.querySelectorAll(".square");
    divRows = [];
    divsInRow = [];
}

function removeGrid() {
    while (gridContainer.firstElementChild) {
        gridContainer.removeChild(gridContainer.lastElementChild);
    }
}

function updateGridSize() {
    gridSize = this.value;
    gridSizeText.innerText = `${gridSize} x ${gridSize}`;
}

function redrawGrid() {
    removeGrid();
    drawGrid(gridSize);
} 

function randomNumberUpTo(number) {
    return Math.floor(Math.random() * number+1);
}

function getColor() {
    rainbowButton.classList.remove("active");
    eraserButton.classList.remove("active");
    darkenButton.classList.remove("active");
    return colorPicker.value;
}

function draw(targetElement) {
    if (targetElement !== null && targetElement.classList.contains("square")) {
        if (rainbowButton.classList.contains("active")) {
            targetElement.style.backgroundColor = `rgb(${randomNumberUpTo(255)}, ${randomNumberUpTo(255)}, ${randomNumberUpTo(255)})`;
        } else if (eraserButton.classList.contains("active")) {
            targetElement.style.backgroundColor = "var(--square-bg-color)";
            targetElement.style.filter = "brightness(100%)";
        } else if (darkenButton.classList.contains("active")) {
            if (targetElement.style.backgroundColor !== "var(--square-bg-color)") {
                let brightness = +(targetElement.style.filter.slice(11,-2));
                targetElement.style.filter = `brightness(${brightness - 10}%)`;
            }
        } else {
            targetElement.style.backgroundColor = getColor();
        }
    }
}

drawGrid(gridSize);
gridSizeText.innerText = `${gridSize} x ${gridSize}`;

gridSizeRangeSlider.addEventListener("input", updateGridSize);
gridSizeRangeSlider.addEventListener("mouseup", redrawGrid);
gridSizeRangeSlider.addEventListener("touchend", redrawGrid);

colorPicker.addEventListener("input", getColor);

gridContainer.addEventListener("mouseup", () => isHoldingMouse = false);
gridContainer.addEventListener("mouseleave", () => isHoldingMouse = false);
gridContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isHoldingMouse = true;
    draw(e.target);
});
gridContainer.addEventListener("mouseover", (e) => {
    if (isHoldingMouse) {
        draw(e.target);
    }
})

gridContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    draw(e.target);
})
gridContainer.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    let targetElement = document.elementFromPoint(x, y);

    draw(targetElement);
})

rainbowButton.addEventListener("click", () => {
    rainbowButton.classList.toggle("active");
    darkenButton.classList.remove("active");
    eraserButton.classList.remove("active");
});
darkenButton.addEventListener("click", () => {
    darkenButton.classList.toggle("active");
    rainbowButton.classList.remove("active");
    eraserButton.classList.remove("active");
});
eraserButton.addEventListener("click", () => {
    eraserButton.classList.toggle("active");
    rainbowButton.classList.remove("active");
    darkenButton.classList.remove("active");
});
clearButton.addEventListener("click", () => squares.forEach(square => {
    square.style.backgroundColor = "var(--square-bg-color)"
    square.style.filter = "brightness(100%)";
}));
