'use strict'


var gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
} 


function getLines(){
    return gMeme.lines
}

function setLine(val){
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine]=val
    console.log('update gmeme')
}
