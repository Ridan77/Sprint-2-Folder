'use strict'

const MOVE_STEP = 10
const FONT_STEP = 4

var gMeme

resetLines()

function resetLines() {
    gMeme = {
        selectedImgId: 1,
        selectedImgSrc: '',

        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 30,
                color: 'yellow',
                pos: { x: 0, y: 50 },

            },
     
        ]
    }
}

function getLines() {
    return gMeme.lines
}

function setLine(val) {
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = val
}


function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function getLinePosition(idx) {
    return gMeme.lines[idx].pos
}

function setLinePos(pos){
        const idx = getSelectedLineIdx()
        gMeme.lines[idx].pos=pos
  

}

function getTotalLine() {
    return gMeme.lines.length
}

function moveLineFromButton(dir) {
    const idx = getSelectedLineIdx()
    gMeme.lines[idx].pos.y += MOVE_STEP * dir
}

function moveLineFromDragAndDrop(dx,dy) {
    const idx = getSelectedLineIdx()
    gMeme.lines[idx].pos.x += dx
    gMeme.lines[idx].pos.y += dy
}

function addLine() {
    gMeme.lines.push(_creatLine())
    console.log(gMeme.lines)
    return gMeme.lines.length - 1
}

function deleteLine() {
    const idx = getSelectedLineIdx()
    gMeme.lines.splice(idx, 1)
    return idx - 1
}

function _creatLine() {
    return {
        txt: '',
        size: 20,
        color: 'white',
        pos: { x: gElCanvas.width / 2 - 50, y: gElCanvas.height / 2 },

    }
}

function changeFontSize(diff) {
    const idx = getSelectedLineIdx()
    gMeme.lines[idx].size += diff * FONT_STEP
}

function setImageSelected(src) {
    gMeme.selectedImgSrc = src
}

function setLineColor(val) {
    const idx = getSelectedLineIdx()
    gMeme.lines[idx].color = val
}

function getPictureSelected() {
    return gMeme.selectedImgSrc
}


function findLineClicked(clickedx, clickedy) {
    const clickedLineIdx = gMeme.lines.findIndex((line, idx) => {
        const { x: x1, y: y1 } = getLinePosition(idx)
        const text = getLines()[idx].txt
        const length = (text) ? (gCtx.measureText(text).width) : 200
        const x2 = x1 + length
        const y2 = getLines()[idx].size + y1
        const withInXAxis = (clickedx >= x1 && clickedx <= x2)
        const withInYAxis = (clickedy >= y1 && clickedy <= y2)
        return (withInXAxis && withInYAxis)
    })
    return clickedLineIdx
}

function getAlign(idx) {
    return getLines()[idx].align
}

function setAlign(dir) {
    const currLine = getLines()[getSelectedLineIdx()].txt
    const textMetric = gCtx.measureText(currLine)
    const length = textMetric.width
    switch (dir) {
        case 'left':
            gMeme.lines[getSelectedLineIdx()].pos.x = 0
            break
        case 'center':
            gMeme.lines[getSelectedLineIdx()].pos.x = 150 - (length / 2)
            break
        case 'right':
            gMeme.lines[getSelectedLineIdx()].pos.x = 300 - length
    }
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

function setSavedImgtoCurrent(imgId){
    const album = loadFromStorage(MEME_KEY)
    const idx = album.findIndex((item,idx)=>{
         return(item.id ===imgId)
    })
    gMeme.lines=album[idx].lines
    gMeme.selectedImgSrc=album[idx].imgUrl
}