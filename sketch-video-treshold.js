let canvas;
let src;
let dst1;
let dst2;
let slider;
let value;
let video;
let videoImage;
let button;

let enable = false;
canvasWidth = 300;
canvasHeight = 300;

function loadOpenCV() {
  return new Promise((resolve) => {
    let script = document.createElement("script");
    script.src = "opencv.js";
    script.onload = () => {
      cv["onRuntimeInitialized"] = () => {
        // do all your work here
        console.log(`openCV loaded!`);
        resolve(true);
      };
    };
    document.body.appendChild(script);
  });
}

function onVideoLoaded() {
  video.volume(0);
  video.hide();
}

function preload() {
  video = createVideo(["f1.mp4"], onVideoLoaded);
}

async function setup() {
  frameRate(10);
  await loadOpenCV();
  dst1 = new cv.Mat();
  dst2 = new cv.Mat();
  canvas = createCanvas(canvasWidth, canvasHeight);
  slider = createSlider(0, 250, 100, 5);
  button = createButton("Play");
  button.mousePressed(() => {
    video.play();
  });
  enable = true;
}

function draw() {
  if (enable) {
    value = slider.value();
    videoImage = video.get();
    src = cv.imread(videoImage.canvas);
    cv.cvtColor(src, dst1, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(dst1, dst2, value, 200, cv.THRESH_BINARY);
    cv.imshow(canvas.elt, dst2);
  } else {
    text("loading...", canvasWidth / 2, canvasHeight / 2);
  }
}
