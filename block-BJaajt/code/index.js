//cats

const img = document.querySelector('.catImg');
const reload = document.querySelector('button');

reload.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=1&size=full');
    xhr.onload = function () {
        let imageData = JSON.parse(xhr.response);
        console.log(imageData[0].url)
        img.src = imageData[0].url;
    };
    xhr.onerror = function () {
        console.log(' Something went wrong ... ');
    };
    xhr.send();
});


// users

const input = document.querySelector('input')
const imgUser = document.querySelector('.userImg') ;
const name = document.querySelector('h3');
const followers = document.querySelector('.followers')
const following = document.querySelector('.following')

function displayUI (data){
    imgUser.src = data.avatar_url;
    name.innerText = data.login;
    followers.innerText = `Followers: ${data.followers}`
    following.innerText = `Following: ${data.following}`
}

function handleChange(event) {
    if (event.keyCode === 13){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${event.target.value}`)
        xhr.onload = function () {
            let userData = JSON.parse(xhr.response);
            displayUI (userData);
        }
        xhr.onerror = function () {
            console.log ('something went wrong ...')
        }
        xhr.send();
        event.target.value = '' ;
    }
}

input.addEventListener ('keyup', handleChange)