'use strict'
var gElCanvas
var gCtx

var gCurrLineWidth
var GCurrLine


function onInit() {
    console.log('init')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme('')

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function renderMeme(val) {
    const elImg = new Image()
    console.log('rendering')
    elImg.src = '/img/1.jpg'
    elImg.onload = () => {
        console.log('** Loading complete! **');
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText(val)
    }
}


function renderText(text) {
    console.log('rendering text')
    const x = 50
    const y = 50
    const textMetric = gCtx.measureText(text)
    const lineWidth =1 
    gCtx.fillStyle = 'yellow'
    gCtx.font = '20px Arial'
    gCtx.textAlign = 'start'
    gCtx.textBaseline = 'top'
    gCtx.fillText(text, x, y)


    gCtx.beginPath()
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = lineWidth
    if (textMetric.width<100) gCtx.strokeRect(x-(2*lineWidth), y-2*lineWidth, 100, 25)
        else gCtx.strokeRect(x-(2*lineWidth), y-2*lineWidth, textMetric.width, 25)

}
  



function onChangeTextLine(val) {
    console.log(val)
    const text = gCtx.measureText(val)
    setLine(val)
    renderMeme(val)

}
