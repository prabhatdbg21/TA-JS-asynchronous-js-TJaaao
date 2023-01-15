//Github User Finder
let input = document.querySelector('input');
let info = document.querySelector('.info');
let userImage = document.querySelector('.info img');
let userName = document.querySelector('.info h3');
let userLogin = document.querySelector('.info p');
let followersUL = document.querySelector('.followers');
let followingUL = document.querySelector('.following');

function fetch(url, successHandler){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.onload = () => successHandler(JSON.parse(xhr.response));
    xhr.onerror = function () {
        console.error(' Something went wrong ... ');
    };
    xhr.send();
}

/*
function displayFollowers(username) {
    followersUL.innerHTML = '' ; // to remove previous data
    fetch(
        `https://api.github.com/users/${username}/followers`, 
        function(followersList){
            let topFive = followersList.slice(0, 5);

            topFive.forEach(info => {
                let li = document.createElement('li');
                let img = document.createElement('img');
                img.src = info.avatar_url;
                img.alt = info.name;
                li.append(img);
                followersUL.append(li);
            })
        }
    );
}

function displayFollowing(username) {
    followingUL.innerHTML = '' ; // to remove previous data
    fetch(
        `https://api.github.com/users/${username}/following`, 
        function(followersList){
            let topFive = followersList.slice(0, 5);

            topFive.forEach(info => {
                let li = document.createElement('li');
                let img = document.createElement('img');
                img.src = info.avatar_url;
                img.alt = info.name;
                li.append(img);
                followingUL.append(li);
            })
        }
    );
}
*/

function displayExtraInfo(url, rootElm) {
    rootElm.innerHTML = '' ; // to remove previous data
    fetch(url, function(followersList){
        let topFive = followersList.slice(0, 5);

        topFive.forEach(info => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = info.avatar_url;
            img.alt = info.name;
            li.append(img);
            rootElm.append(li);
        })
    });
}

function handleDisplay(userInfo) {
    userImage.src = userInfo.avatar_url;
    userImage.alt = userInfo.name;
    userName.innerText = userInfo.name;
    userLogin.innerText = '@' + userInfo.login;
    /*
    displayFollowers(userInfo.login);
    displayFollowing(userInfo.login);
    */
    displayExtraInfo(`https://api.github.com/users/${userInfo.login}/followers`, followersUL);
    displayExtraInfo(`https://api.github.com/users/${userInfo.login}/following`, followingUL);
}

function handleInput(event) {
    if (event.keyCode === 13 && input.value){
        const url = `https://api.github.com/users/`;
        let username = input.value;
        fetch(url + username, handleDisplay)

        input.value = '';
    }
}

input.addEventListener ('keydown', handleInput)




//  Cats
const catsImage = document.querySelector('.cats img');
const catsButton = document.querySelector('.cats button');

function handleClick(){
    fetch ( `
        https://api.thecatapi.com/v1/images/search?limit=1&size=full`, 
        function(catInfo){
            catsImage.src = catInfo[0].url;
        }
    )
}

catsButton.addEventListener('click', handleClick)















/*
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

const input = document.querySelector('input');
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
*/