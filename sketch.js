let img;

function preload() {
  img = loadImage('/Assets/Images/Background.jpg');
}

function setup() {
  createCanvas(1000, 1000);
  background (50);
}

function draw() {
  image(img, 0, 0, [1000], [1000]);
}
