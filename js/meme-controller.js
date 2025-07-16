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
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function onGallryClicked() {
    console.log('gallery')
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
}

function onEditorClicked() {
    console.log('editor')
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')
}

function onChoosePic(src) {
    console.log(src)
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')
    setImageSelected(src)
    renderMeme(src)
}

function renderMeme() {
    const src = getPictureSelected()
    const elImg = new Image()
    elImg.src = src
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
    renderBorder(size)

}

function renderBorder(size) {
    const idx = getSelectedLineIdx()
    const text = getLines()[idx].txt
    // if (!text) return
    const textMetric = gCtx.measureText(text)
    const length = (text) ? (textMetric.width + 10) : 100
    const { x, y } = getLinePosition(idx)
    gCtx.strokeRect(x - 5, y - 5, length, size + 5)
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
    document.querySelector('.input-text').value = ''
    renderMeme()
}

function onDeletehLine() {
    setSelectedLineIdx(deleteLine())
    renderMeme()
}


function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onSetColor(val){
    setLineColor(val)
}