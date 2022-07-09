let img
let canvas
let src
let dst1

let slider
let value

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



function preload() {
  img = loadImage('lenna.jpeg')
}

async function setup() {
  await loadOpenCV()
  dst1 = new cv.Mat()
  canvas = createCanvas(canvasWidth, canvasHeight);
  noLoop()
  enable = true
}

function draw() {
  if (enable) {
    src = cv.imread(img.canvas)
    cv.cvtColor(src, dst1, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow(canvas.elt, dst1)
  }else{
    text('loading...',canvasWidth/2,canvasHeight/2)
  }
}
