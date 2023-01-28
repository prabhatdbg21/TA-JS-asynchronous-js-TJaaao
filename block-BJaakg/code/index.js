let url = `https://www.anapioficeandfire.com/api/books`;
let allBooks = document.querySelector('.all-books')
let characters = document.querySelector('.characters')
let allcharacters = document.querySelector('.allcharacters')
let button = document.querySelector('.button')
let loadding = document.querySelector('.loadding')

let arr = []

function handleSpinner(status = false){
    if (status) {
        loadding.innerHTML = `<div class="donut"></div>` ;
    }
    else{
        loadding.innerHTML = '';
    }
}


function createBook(info) {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = info.name
    let p = document.createElement('p');
    p.innerText = info.authors
    let button = document.createElement('button');
    button.innerText = `Show Characters (${info.characters.length})`
    button.addEventListener('click', () =>{
        arr = []
        arr.push(info.characters);
        bookCharacters()
    })

    div.append(h2, p, button)
    allBooks.append(div)
}

function charact(char){
    let div = document.createElement('div');
    let p = document.createElement('p');
    p.innerText = `${char.name} : (${char.aliases})`;
    div.append(p)
    allcharacters.append(div)
}

function bookCharacters() {
    arr.forEach((allbook) => { 
        characters.style.display = `inline-block`;
        button.addEventListener('click', () => {
            characters.style.display = `none`;
            allcharacters.innerHTML = '';
        })
        allbook.forEach((book) => {
            fetch(book)
            .then((res) => res.json())
            .then((info) => {
                charact(info)
            })
        })
    })
}

function init(){
    handleSpinner(true);
    fetch(url)
    .then((res) => res.json())
    .then((books) =>{
        handleSpinner(false)
        books.forEach((book) => {
            createBook(book)
        });
    })
}
init()