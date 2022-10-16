
const rainbows = document.querySelectorAll('.rainbow')

function createURL(element) {
    let classes = element.classList
    switch (true) {
        case classes.contains('ru'):
            return URL = 'json/rainbow-ru.json'
        case classes.contains('en'):
            return URL = 'json/rainbow-en.json'
    }
}

rainbows.forEach((rainbow) => {
    createURL(rainbow)
    sendRequest('GET', URL)
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let color = document.createElement('li')
                fillLists(data, i, rainbow, color)
                openPage(color, data, i)
            }
    })
})

function fillLists(data, i, parentNode, color) {
    color.classList.add('item')
    color.textContent = data[i].text
    parentNode.appendChild(color)
    return color;
}

function openPage(item, data, i) {
    item.addEventListener('click', () => {
        setText(item, data, i)
        window.open('index-item.html')

    })
}

function sendRequest(method, url) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }
        xhr.send()
    })
}

function setText(item, data, i) {
    localStorage.setItem('element', data[i].color)
}
