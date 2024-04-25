// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}
let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2Ftileset.png?v=1611654020439"
  );
}

function reseed() {
  seed = (seed | 0) + 110
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}


function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length) {
    return grid[i][j] == target;
  } else {
    return false;
  }
}


function gridCode(grid, i, j, target) {
  let bitCode = 0;
  
  //checks north
  if (gridCheck(grid, i - 1, j, target)) {
    bitCode += 1<<0
  }
  //checks south
  if (gridCheck(grid, i + 1, j, target)) {
    bitCode += 1<<3
  }
  //checks east
  if (gridCheck(grid, i, j + 1, target)) {
    bitCode += 1<<2
  }
  //checks west
  if (gridCheck(grid, i, j - 1, target)) {
    bitCode += 1<<1
  }
  
  return bitCode;
}


function drawContext(grid, i, j, target, ti, tj) {
  const locationCode = gridCode(grid, i, j, target);
  
  const [tiOffset, tjOffset] = lookup[locationCode];

  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}

function generateGrid(numCols, numRows) {
  let grid = [];

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  // Randomly pick groups of tiles to set to 'c'
  let numGroups = floor(random(2, 6)); // Increased maximum number of groups by 1
  for (let g = 0; g < numGroups; g++) {
    let groupSize = floor(random(3, 16)); // Doubled the maximum group size
    let startX = floor(random(numCols)); // Random start X coordinate
    let startY = floor(random(numRows)); // Random start Y coordinate

    let centerX = startX + floor(groupSize / 2); // Calculate the center X coordinate of the group
    let centerY = startY + floor(groupSize / 2); // Calculate the center Y coordinate of the group

    for (let i = startY; i < startY + groupSize && i < numRows; i++) {
      for (let j = startX; j < startX + groupSize && j < numCols; j++) {
        if (i >= 0 && j >= 0) {
          // Calculate the distance from the current tile to the center of the group
          let distance = sqrt(pow(j - centerX, 2) + pow(i - centerY, 2));
          // If the distance is within a circular boundary, set the tile to 'c'
          if (distance <= groupSize / 2) {
            grid[i][j] = 'c';
          }
        }
      }
    }
  }

  return grid;
}

function drawGrid(grid) {
  background(128);
  let t = millis() / 2000.0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '_') {
        placeTile(i, j, (floor(random(4))), 0);
        if (random(1) < 0.03) {
          placeTile(i, j, 26, floor(random(4)))
        }
      } else if (grid[i][j] === '.') {
        placeTile(i, j, random(4) | 0, 13);
        drawContext(grid, i, j, '.', 0, 0);
      }  else if (grid[i][j] === 'c') { // New condition for 'c' tiles
        placeTile(i, j, (3 * pow(noise(t / 10, i, j / 4 + t), 2)) | 0, 13);
        drawContext(grid, i, j, 'c', 3, 4)
      } 
    }
  }
}

const lookup = [
  [2,0],
  [5,2],
  [2,0],
  [4,3],
  [4],
  [4,2],
  [5],
  [5,2],
  [2],
  [2,1],
  [2],
  [5,1],
  [4],
  [4,1],
  [2],
  [2,0]
];

