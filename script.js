const rainbows = document.querySelectorAll('.rainbow')
const HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JSON Test Item</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <header>
        <ul class="header-list">
            <li>Меню 1</li>
            <li>Меню 2</li>
            <li>Меню 3</li>
        </ul>
    </header>
    <div class="answer">
    </div>
    <script src="script-item.js"></script>
    </body>
    </html>
`

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
        let opened = window.open(`index-item-${data[i].language}-${i}.html`)
        console.log(`index-item-${data[i].language}-${i}.html`)
        opened.document.write(HTML)
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
