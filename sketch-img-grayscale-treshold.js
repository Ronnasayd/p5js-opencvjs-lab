let img
let canvas
let src
let dst1
let dst2
let slider
let value


let enable = false
canvasWidth = 300
canvasHeight = 300

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
  dst2 = new cv.Mat()
  canvas = createCanvas(canvasWidth, canvasHeight);
  slider = createSlider(0,250,100)
  enable = true
}

function draw() {
  if (enable) {
    value = slider.value()
    src = cv.imread(img.canvas)
    cv.cvtColor(src, dst1, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(dst1, dst2, value, 200, cv.THRESH_BINARY);
    cv.imshow(canvas.elt, dst2)
  }else{
    text('loading...',canvasWidth/2,canvasHeight/2)
  }
}
