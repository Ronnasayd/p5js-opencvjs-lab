let img
let canvas
let src
let dst1

let slider
let value
let capture
let captureImage

canvasWidth = 300
canvasHeight = 300

let enable = false

function loadOpenCV() {
  return new Promise(resolve => {
    let script = document.createElement('script')
    script.src = 'opencv.js'
    script.onload = () => {
      cv['onRuntimeInitialized'] = () => {
        // do all your work here
        console.log(`openCV loaded!`)
        resolve(true)
      };

    }
    document.body.appendChild(script)
  })
}


async function setup() {
  await loadOpenCV()
  dst1 = new cv.Mat()
  canvas = createCanvas(canvasWidth, canvasHeight);
  capture = createCapture(VIDEO)
  capture.hide()
  enable = true
}

function draw() {
  if (enable) {
    captureImage = capture.get()
    src = cv.imread(captureImage.canvas)
    cv.cvtColor(src, dst1, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow(canvas.elt, dst1)
  }else{
    text('loading...',canvasWidth/2,canvasHeight/2)
  }
}
