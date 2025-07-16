'use strict'

const MOVE_STEP = 10
const FONT_STEP = 4

var gMeme = {

    selectedImgId: 1,
    selectedImgSrc: '',

    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'yellow',
            pos: { x: 50, y: 50 }
        },
        {
            txt: '',
            size: 20,
            color: 'green',
            pos: { x: 50, y: 250 }
        }
    ]
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

function getTotalLine() {
    return gMeme.lines.length
}

function moveLine(dir) {
    const idx = getSelectedLineIdx()
    gMeme.lines[idx].pos.y += MOVE_STEP * dir
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
        pos: { x: gElCanvas.width / 2 - 50, y: gElCanvas.height / 2 }
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
        const withInXAxis = (clickedx >= x1 && clickedx<=x2)
        const withInYAxis = (clickedy >= y1 && clickedy<=y2)
        return (withInXAxis&&withInYAxis)
    })
    return clickedLineIdx
}

