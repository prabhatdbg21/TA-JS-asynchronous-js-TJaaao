const url = 'https://api.unsplash.com/photos/?client_id=I0qAL6RY8JqjJJow9Adr5NtlfDNDvD80kEJq-_tOqHI' ;
const getSearchURL = (query) =>  {
    return `https://api.unsplash.com/search/photos?query=${query}&client_id=I0qAL6RY8JqjJJow9Adr5NtlfDNDvD80kEJq-_tOqHI`;  // url is important
}

const searchElm = document.querySelector('input');
const root = document.querySelector('.img-div');

function fetch (url) {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject('something went wrong ...');
        xhr.send();
    })
}


function displayImages (images){
    root.innerHTML = '';
    images.forEach((image) => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = image.urls.small;
        li.append(img);
        root.append(li)
    });
}

fetch(url).then(useInfo => displayImages(useInfo)).catch((error) => console.log(error));
// 0R   fetch(url).then(displayImages).catch((error) => console.log(error));

function handleSearch (event){
    if(event.keyCode === 13 ){
        fetch(getSearchURL(searchElm.value)).then(searchResult => {
            displayImages(searchResult.results);
        }).catch((error) => alert('check your internate connection'));

        searchElm.value = '';
    }
}

searchElm.addEventListener('keyup', handleSearch);