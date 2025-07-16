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
        // console.log(x,y,item.txt,item.color,item.size)
        renderText(item.txt, x, y, item.color, item.size)
    })
}

function renderText(text, x, y, color, size) {
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.fillText(text, x, y)
    renderBorder()

}

function renderBorder() {
    const idx = getSelectedLineIdx()
    const text = getLines()[idx].txt
    // if (!text) return
    const textMetric = gCtx.measureText(text)
    const length = (text) ? (textMetric.width + 10) : 100
    const { x, y } = getLinePosition(idx)
    gCtx.strokeRect(x - (4), y - 4, length, 25)
}


function onChangeTextLine(val) {
    const text = gCtx.measureText(val)
    setLine(val)
    renderMeme(val)

}

function onSwitchLine(diff) {
    var currLineInx = getSelectedLineIdx()
    currLineInx += diff
    if (currLineInx === -1) currLineInx = getTotalLine() - 1
    if (currLineInx === getTotalLine()) currLineInx = 0
    setSelectedLineIdx(currLineInx)
    const elInput = document.querySelector('.input-text')
    const newLineTxt = getLines()[currLineInx].txt
    elInput.value = newLineTxt
    renderMeme()
}

function onMoveLine(dir) {
    moveLine(dir)
    renderMeme()
}


function onAddLine() {
    setSelectedLineIdx(addLine())
    renderMeme()
}