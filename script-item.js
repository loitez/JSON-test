const newPage = document.querySelector('.answer')
let value = localStorage.getItem('element')

fillPage()

function fillPage() {
    let heading = document.createElement('h1')
    heading.textContent = value;
    newPage.appendChild(heading)
}



