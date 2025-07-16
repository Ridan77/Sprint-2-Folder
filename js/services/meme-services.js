'use strict'

const gLinePositions = [{ x: 50, y: 50 }, { x: 50, y: 250 }]

var gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'red'
        },
        {txt:''}
    ]
} 


function getLines(){
    return gMeme.lines
}

function setLine(val){
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt=val
}


function getSelectedLineIdx(){
    return gMeme.selectedLineIdx
}

function setSelectedLineIdx(idx){
     gMeme.selectedLineIdx=idx
}

function getLinePosition(idx){
    return gLinePositions[idx]
}

function getTotalLine(){
    return gMeme.lines.length
}