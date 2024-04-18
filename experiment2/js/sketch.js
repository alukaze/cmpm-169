/* exported setup, draw */
let seed = 0;

// listener for reimagine button
$("#clicker").click(function() {
  seed++;
});

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


function draw() {
  randomSeed(seed);

  let color1 = color(random(0, 255), random(0, 255), random(0, 255));
  let color2 = color(random(0, 255), random(0, 255), random(0, 255));
  
  setGradient(0, 0, width, height, color1, color2);

  let sunBrightness = random(200, 255);

  fill(255, 204, 0, sunBrightness);
  noStroke();
  ellipse(width / 3 + random(-15, 15), height / 2 + random(-15, 15), 100, 100);
  
  drawClouds();
  
  let waveHeight1 = random(350, 450);
  drawWaves(waveHeight1, color(0, 255, 255), random(0.02, 0.04), random(0.01, 0.05), random(1.19, 1.21), random(-PI / 4, PI / 4));
  
  let waveHeight2 = random(380, 450);
  drawWaves(waveHeight2, color(0, 128, 128), random(0.01, 0.03), random(0.015, 0.025), random(9.99, 10.01), random(-PI / 4, PI / 4));
  
  let waveHeight3 = random(waveHeight2 + 25, 500);
  drawWaves(waveHeight3, color(75, 0, 130), random(0.04, 0.06), random(0.02, 0.04), random(14.9, 15.1), random(-PI / 4, PI / 4));
}

function drawWaves(waveHeight, color, speed, frequency, amplitude, phase) {
  noStroke();
  fill(color);
  beginShape();
  vertex(0, height);
  for (let x = 0; x < width; x += 5) {
    let y = waveHeight + sin(x * frequency + frameCount * speed + phase) * amplitude;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function setGradient(x, y, width, height, color1, color2) {
  noFill();
  for (let i = y; i <= y + height; i++) {
    let gradientPosition = map(i, y, y + height, 0, 1);
    let gradientColor = lerpColor(color1, color2, gradientPosition);
    stroke(gradientColor);
    line(x, i, x + width, i);
  }
}

function drawClouds() {
  let numClouds = random(5, 10);
  for (let i = 0; i < numClouds; i++) {
    let cloudX = random(width);
    let cloudY = random(height / 4);
    let cloudSize = random(50, 200);
    fill(255, 200);
    ellipse(cloudX, cloudY, cloudSize, cloudSize / 2);
    ellipse(cloudX + cloudSize / 3, cloudY - cloudSize / 5, cloudSize, cloudSize / 2);
    ellipse(cloudX + cloudSize / 6, cloudY + cloudSize / 4, cloudSize, cloudSize / 2);
  }
}