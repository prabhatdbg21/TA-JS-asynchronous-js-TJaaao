const url = 'https://api.unsplash.com/photos/?client_id=I0qAL6RY8JqjJJow9Adr5NtlfDNDvD80kEJq-_tOqHI' ;
const getSearchURL = (query) =>  {
    return `https://api.unsplash.com/search/photos?query=${query}&client_id=I0qAL6RY8JqjJJow9Adr5NtlfDNDvD80kEJq-_tOqHI`;
}

const searchElm = document.querySelector('input');
const root = document.querySelector('.img-div');

function fetch(url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function (){
        let data = JSON.parse(xhr.response); 
        successHandler(data);
    }
    xhr.onerror = function () {
        console.log('something went wrong ...')
    }
    xhr.send();
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

fetch(url, displayImages);

function handleSearch (event){
    if(event.keyCode === 13 ){
        fetch(getSearchURL(searchElm.value), (searchResult) => {
            displayImages(searchResult.results);
        });

        searchElm.value = '';
    }
}

searchElm.addEventListener('keyup', handleSearch);
