let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
let newsElm = document.querySelector(".news");
let select = document.querySelector("#options");
let allNews = [];

function addOption(sources) {
    sources.forEach((source) =>{
        let option = document.createElement('option');
        option.innerText = source;
        option.value = source;
        select.append(option)
    })
}

function addNews(detail){
    newsElm.innerHTML = '';
    detail.forEach ((info) => {
        let section = document.createElement('section');
        let img = document.createElement('img')
        img.src = info.imageUrl
    
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerText = info.newsSite;
        let p = document.createElement('p');
        p.innerText = info.title;
        let a = document.createElement('a');
        a.innerText = 'Read More';
        a.href = info.url;
        div.append(h2, p, a)
    
        section.append(img, div)
        newsElm.append(section)
    })
}

let dataPromise = fetch(url)
    .then((resolve) => resolve.json())
    .then((news) => {
        allNews = news;
        addNews(news);
        let allSources = Array.from(new Set (news.map((n) => n.newsSite)));
        addOption(allSources)
    }
)


select.addEventListener('change' , (event) => {
    let source = event.target.value.trim();
    if (source) {
        var filteredNews = allNews.filter(news => news.newsSite === source); 
    }
    else{
        filteredNews = allNews;
    }
    addNews(filteredNews);
})





/*
index.js

let root = document.querySelector("#options")
let allnews = document.querySelector(".news")

let arr= []
function removeDuplicates(arr) { 
    var unique = [ ] ;
    arr.forEach(element => { 
        if (!unique.includes(element)) { 
           unique.push(element); 
        } 
    });
    return unique;
}



function addOption(text) {
    let option = document.createElement('option');
    option.innerText = `${text}`;
    root.append(option)
}

function addNews(detail){
    let section = document.createElement('section');
    let img = document.createElement('img')
    img.src = detail.imageUrl

    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = detail.newsSite;
    let p = document.createElement('p');
    p.innerText = detail.title;
    let a = document.createElement('a');
    a.innerText = 'Read More';
    a.href = detail.url;
    div.append(h2, p, a)

    section.append(img, div)
    allnews.append(section)
}


let dataPromise = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
    .then((resolve) => resolve.json())
    .then((allInfo) => {
        allInfo.forEach((info) => {
            arr.push(info.newsSite)
            addNews(info)
        });
    })
    .then(() => removeDuplicates(arr).forEach((elm) => {
        addOption(elm)
    })
)
*/
