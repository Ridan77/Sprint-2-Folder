'use strict'
var gElCanvas
var gCtx
var gIsMouseDown = false

function onInit() {
    console.log('init')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.textAlign = 'start'
    gCtx.textBaseline = 'top'
    gCtx.lineWidth = 2

}

function onGallryClicked() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
    const elSaved = document.querySelector('.saved-images-container')
    document.querySelector('.saved-images-container').classList.add('hide')
}

function onEditorClicked() {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')
    document.querySelector('.saved-images-container').classList.add('hide')
}

function onSavedClicked() {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.saved-images-container').classList.remove('hide')
    renderSavedImgs()
}

function onChoosePic(src) {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')
    resetLines()
    setImageSelected(src)
    renderMeme()
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
    lines.forEach((item, idx) => {
        const { x, y } = getLinePosition(idx)
        renderText(item.txt, x, y, item.color, item.size, idx)
    })
}

function renderText(text, x, y, color, size, idx) {
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.fillText(text, x, y)
    if (idx === getSelectedLineIdx()) renderBorder(size)
}

function renderBorder(size) {
    const idx = getSelectedLineIdx()
    const text = getLines()[idx].txt
    gCtx.strokeStyle = 'white'
    const textMetric = gCtx.measureText(text)
    const length = (textMetric.width >200) ? (textMetric.width + 10) : 200
    const { x, y } = getLinePosition(idx)
    gCtx.strokeRect(x - 5, y - 5, length, size + 5)
}


function onChangeTextLine(val) {
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

function onSetColor(val) {
    setLineColor(val)
}

function onCanvasClick(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    const lineClickedIdx = findLineClicked(offsetX, offsetY)
    if (lineClickedIdx !== -1) {
        setSelectedLineIdx(lineClickedIdx)
        const elInput = document.querySelector('.input-text')
        const newLineTxt = getLines()[getSelectedLineIdx()].txt
        elInput.value = newLineTxt
        renderMeme()
    }
}

function onAddEmoji(emoji) {
    const elInput = document.querySelector('.input-text')
    var line = getLines()[getSelectedLineIdx()].txt
    line += emoji
    setLine(line)
    elInput.value = line
    renderMeme()

}
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onChangeAlign(dir) {
    setAlign(dir)
    renderMeme()
}

function onUploadToFB(url) {
    document.querySelector('.share-container').innerHTML = ''
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onShare(ev) {

    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
        `
    }
    uploadImg(canvasData, onSuccess)
}


function onSave() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        saveImg(uploadedImgUrl)
    }
    uploadImg(canvasData, onSuccess)
}

function renderSavedImgs() {
    console.log('Rendering img')
    const ElSavedContainer = document.querySelector('.saved-images-container')
    const savedImgs = getSavedImg()
    if (!savedImgs) {
        console.log('No images')
        ElSavedContainer.innerHTML = '<h4>No saved memes were found...</h4>'
        return
    }
    const strHTMLs = savedImgs.map(item => (
        `<a onclick="onSelectSavedImg('${item.id}')" class="${item.id}">
           <img src="${item.imgUrl}">           </a>`
    ))
    console.log(strHTMLs.join(''))
    ElSavedContainer.innerHTML = strHTMLs.join('')
}

function onSelectSavedImg(imgId) {
    setSavedImgtoCurrent(imgId)
    onEditorClicked()
    renderMeme()
}


function onDown(ev) {
    const pos = getEvPos(ev)
    gIsMouseDown = true
    onCanvasClick(pos)
}

function onUp(ev) {
    gIsMouseDown = false
}

function onDraw(ev) {
    if (!gIsMouseDown) return
    const pos = getEvPos(ev)
    setLinePos(pos)
    renderMeme()
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onCanvasClick(pos) {
    const lineClickedIdx = findLineClicked(pos.x, pos.y)
    if (lineClickedIdx !== -1) {
        setSelectedLineIdx(lineClickedIdx)
        const elInput = document.querySelector('.input-text')
        const newLineTxt = getLines()[getSelectedLineIdx()].txt
        elInput.value = newLineTxt
        renderMeme()
    }
}