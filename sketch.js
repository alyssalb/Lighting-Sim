let img;
let currentColor;
let promptText = "";
let spotlightX;
let colorChanged = false;
let positionChanged = false;
let intensityChanged = false;

function preload() {
  img = loadImage("https://alyssalb.github.io/Lighting-Sim//Assets/Background.jpg");
}

function setup() {
  createCanvas(1000, 1000);
  background(50);

  // Set initial spotlight position and color
  spotlightX = width / 3 - 60;
  currentColor = color(255, 255, 255); // White
}

function draw() {
  // Display the background image
  image(img, 0, 0, 1000, 1000);

  // Display grey boxes over interactive areas if mouse is hovering over them
  fill(128, 128, 128, 150); // Semi-transparent grey color
  noStroke();

  if (mouseX > 10 && mouseX < 193 && mouseY > 439 && mouseY < 700) {
    rect(10, 439, 183, 261);
  } else if (mouseX > 252 && mouseX < 538 && mouseY > 480 && mouseY < 606) {
    rect(252, 480, 286, 126);
  } else if (mouseX > 736 && mouseX < 859 && mouseY > 590 && mouseY < 629) {
    rect(736, 590, 123, 39);
  } else if (mouseX > 296 && mouseX < 382 && mouseY > 630 && mouseY < 820) {
    rect(296, 630, 86, 190);
  }

  // Draw spotlight
  noStroke();
  fill(currentColor);
  ellipse(spotlightX, 250, 150, 100); // Smaller and more elliptical spotlight

  // Display the prompt text if available
  if (promptText) {
    fill(0, 150); // Semi-transparent black background
    rectMode(CENTER);
    rect(width / 2, 105, textWidth(promptText) + 20, 50, 10); // Draw a rectangle behind the text

    fill(255); // White text for visibility
    textSize(16);
    textAlign(CENTER, TOP);
    text(promptText, width / 2, 70);
  }

  // Display the coordinates
  displayCoordinates();
}

function displayCoordinates() {
  // Set the text properties
  fill(255); // White text for visibility
  textSize(16);
  textAlign(LEFT, BOTTOM);

  // Display mouse coordinates in the bottom-left corner
  text(`x: ${mouseX}, y: ${mouseY}`, 10, height - 10);
}

function endGameScreen() {
  // Clear the screen and display the end screen with a gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 235), color(0, 150, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Draw the sun
  fill(255, 204, 0); // Yellow sun
  ellipse(width / 2, 150, 200, 200);

  // Display the end message
  fill(255); // White text for visibility
  textSize(24);
  textAlign(CENTER, CENTER);
  text(
    "Mandated break time - go see the sun while you still have time.",
    width / 2,
    height / 2
  );

  // Prevent further interaction after end screen
  noLoop();
}

function mouseMoved() {
  // Check if mouse is over interactive areas
  if (
    mouseX > 10 &&
    mouseX < 193 &&
    mouseY > 439 &&
    mouseY < 700 &&
    promptText !== ""
  ) {
    cursor("pointer"); // Coffee Break (only available after other prompts)
  } else if (mouseX > 252 && mouseX < 538 && mouseY > 480 && mouseY < 606) {
    cursor("pointer"); // Position Changer
  } else if (mouseX > 736 && mouseX < 859 && mouseY > 590 && mouseY < 629) {
    cursor("pointer"); // Color Changer
  } else if (mouseX > 296 && mouseX < 382 && mouseY > 630 && mouseY < 820) {
    cursor("pointer"); // Intensity Changer
  } else {
    cursor("default"); // Default cursor
  }
}

function mousePressed() {
  // Prompt Color Change
  if (mouseX > 736 && mouseX < 859 && mouseY > 590 && mouseY < 629) {
    promptText =
      "Click to change the color of the lights - stop when you find one you like!";
    let colors = [
      color(255, 0, 0), // Red
      color(0, 0, 255), // Blue
      color(0, 204, 0), // Green
      color(255, 255, 0), // Yellow
      color(102, 0, 153), // Purple
      color(255, 255, 255), // White
    ];
    currentColor = random(colors);
    colorChanged = true;
  }
  // Prompt Position Change
  else if (mouseX > 252 && mouseX < 538 && mouseY > 480 && mouseY < 606) {
    promptText = "Click to change the position of the lights.";
    let positions = [width / 3 - 140, width / 3 - 60, width / 3 + 140];
    spotlightX = random(positions);
    positionChanged = true;
  }
  // Prompt Intensity Change
  else if (mouseX > 296 && mouseX < 382 && mouseY > 630 && mouseY < 820) {
    promptText = "Click to change the intensity of the spotlight.";
    let intensities = [50, 150, 255];
    let intensity = random(intensities);
    currentColor = color(
      red(currentColor),
      green(currentColor),
      blue(currentColor),
      intensity
    );
    intensityChanged = true;
  }
  // Prompt Coffee Break (ends game)
  else if (mouseX > 10 && mouseX < 193 && mouseY > 439 && mouseY < 700) {
    endGameScreen();
  }
}
