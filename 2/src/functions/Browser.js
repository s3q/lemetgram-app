
window.onclose = function () {
    localStorage.removeItem("history");
    return '';
};

function setHistoryUrl() {
    let url = window.location.href
    let urlData = {}
    let urlStore = []
    if (window.localStorage.getItem("history")) {
        let createdAt = (JSON.parse(window.localStorage.getItem("history")).createdAt - Date.now()) / 3600000
        if (createdAt < 24) {
            if (JSON.parse(window.localStorage.getItem("history")).url)
                urlStore = JSON.parse(window.localStorage.getItem("history")).url
                urlData.createdAt = JSON.parse(window.localStorage.getItem("history")).createdAt
        } else {
            deleteHistoryUrl()
        }

    } else {
        urlData.createdAt = Date.now()
    }

    urlStore.push(url)

    urlData.url = urlStore

    window.localStorage.setItem("history", JSON.stringify(urlData))
    return JSON.parse(window.localStorage.getItem("history")).url
}

function deleteHistoryUrl() {
    return window.localStorage.removeItem("history")
}


function getHistoryUrl() {
    return JSON.parse(window.localStorage.getItem("history")).url
}

function getPathParam(url) {
    let urlArray = url.split("/")
    let param = urlArray[1]
    return param
}

const chunkImgUrlData = (imgSrc) => {
    if (imgSrc.startsWith("data")) {

        let dataUrl = imgSrc
        console.log(dataUrl, dataUrl.length)

        let chunkArray = []


        let chunkEnd = 100000

        let loopCount = (dataUrl.length / chunkEnd)

        console.log(chunkEnd)

        for (let i = 0; i < loopCount; i++) {
            const chunk = dataUrl.slice((i * chunkEnd), ((i + 1) * chunkEnd));
            chunkArray.push(chunk)
        }

        return chunkArray
    } else {
        return false
    }
}


function getMinusTime(time) {
    let seconds = Math.floor((new Date() - time) / 1000);
    let hours = seconds / 3600
    return hours
}

function resizeImage(base64Str, mime_type, quality = .7, maxWidth = 400, maxHeight = 350) {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL(mime_type, quality))
        }
    })
}


function setCookie(cname, cvalue, exdays = "") {
    var d = new Date();
    if (exdays !== "") {
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
    } else {
        var expires = "expires";
    }
    try {
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } catch (error) {
        console.log('[-] ' + error);
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

export default {
    setHistoryUrl,
    getHistoryUrl,
    setCookie,
    getCookie,
    getPathParam,
    getMinusTime,
    chunkImgUrlData,
    resizeImage
}
