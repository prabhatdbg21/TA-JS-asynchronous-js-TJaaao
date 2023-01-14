let input = document.querySelector('input');
let imgDiv = document.querySelector('.img-div')

function addImage (info){
    imgDiv.innerHTML = '';
    info.forEach(eachInfo => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = eachInfo.urls.small;
        li.append(img);
        imgDiv.append(li)
    });
}

function handleChange (event){
    if(event.keyCode === 13){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.unsplash.com/photos/?client_id=T8FUFisobh8YqM8oZ8UVCmnY5wm-X_KGn4vDNZm-N4U');
        xhr.onload = function (){
            let data = JSON.parse(xhr.response); 
            addImage(data)
        }
        xhr.onerror = function () {
            console.log('something went wrong ...')
        }
        xhr.send();
        event.target.value = '';
    }
}

input.addEventListener('keyup', handleChange);
