'use strict'
var gElCanvas
var gCtx

function onInit() {
    console.log('init')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const lineWidth = 2
    gCtx.textAlign = 'start'
    gCtx.strokeStyle = 'white'
    gCtx.textBaseline = 'top'
    gCtx.lineWidth = lineWidth
    renderMeme('')
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function renderMeme(val) {
    const elImg = new Image()
    elImg.src = '/img/1.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
    }
}

function renderLines() {
    const lines = getLines()
    const selectedLineIsx = getSelectedLineIdx()
    lines.forEach((item, idx) => {
        const { x, y } = getLinePosition(idx)
        renderText(item.txt, x, y)
    })
}

function renderText(text, x, y) {
    console.log(x, y, text)
    gCtx.fillText(text, x, y)
    renderBorder()

}

function renderBorder() {
    const idx = getSelectedLineIdx()
    const text = getLines()[idx].txt
    if (!text) return
    const { x, y } = getLinePosition(idx)
    const textMetric = gCtx.measureText(text)
    gCtx.fillStyle = 'yellow'
    gCtx.font = '20px Arial'
    gCtx.strokeRect(x - (4), y - 4, textMetric.width+10, 25)
}


function onChangeTextLine(val) {
    const text = gCtx.measureText(val)
    setLine(val)
    renderMeme(val)

}

function onSwitchLine() {
    var currLineInx = getSelectedLineIdx()
    currLineInx++
    if (currLineInx === getTotalLine()) currLineInx = 0
    setSelectedLineIdx(currLineInx)
    const elInput = document.querySelector('.input-text')
    const newLineTxt = getLines()[currLineInx].txt
    elInput.value = newLineTxt
    console.log(currLineInx)
    renderLines()


}