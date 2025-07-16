'use strict'

const MOVE_STEP = 10

var gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'red',
            pos: { x: 50, y: 50 }
        },
        {
            txt: '',
            size: 20,
            color: 'yellow',
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

function addLine(){
    gMeme.lines.push(_creatLine())
    console.log(gMeme.lines)
    return gMeme.lines.length-1
}

function _creatLine(){
    return     {
            txt: '',
            size: 20,
            color: 'white',
            pos: { x: gElCanvas.width/2-50, y: gElCanvas.height/2 }
        }

}
