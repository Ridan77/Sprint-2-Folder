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


function saveImg(img){

    var album = loadFromStorage(IMAGE_KEY)
    if (!album) album=[{id: makeId(), img}]
    else album.unshift({id :makeId(),img})
    console.log(album)
    saveToStorage(IMAGE_KEY,album)
}

function saveImg(img){

    var album = loadFromStorage(MEME_KEY)
    if (!album) album=[{id: makeId(), img}]
    else album.unshift({id :makeId(),img})
    console.log(album)
    saveToStorage(MEME_KEY,album)
}
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
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