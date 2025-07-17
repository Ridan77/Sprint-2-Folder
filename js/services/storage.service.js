'use strict'

const MEME_KEY = 'MEMES'


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


function saveImg(urlStr) {

    var album = loadFromStorage(MEME_KEY)
    if (!album) album = [{
        id: makeId(),
        lines: gMeme.lines,
        imgUrl: urlStr,
    }
    ]
    else album.unshift({
        id: makeId(),
        lines: gMeme.lines,
        imgUrl: urlStr,
    })
    console.log(album[0].imgUrl)
    saveToStorage(MEME_KEY, album)
}
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function getSavedImg() {
    return loadFromStorage(MEME_KEY)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let txt = ''

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}