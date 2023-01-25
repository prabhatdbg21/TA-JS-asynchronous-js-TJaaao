let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
let newsElm = document.querySelector(".news");
let select = document.querySelector("#options");
let allNews = [];


let body = document.querySelector("body");
let h1 = document.querySelector("h1");

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
    .then((resolve) => {
        h1.innerText = `lodding`;
        if(!resolve.ok){
            throw new Error (`Error happend: ${resolve.status}`)
        }
        return resolve.json()
    })
    .then((news) => {
        allNews = news;
        addNews(news);
        let allSources = Array.from(new Set (news.map((n) => n.newsSite)));
        addOption(allSources)
    })
    .catch((error) => {
        body.innerHTML= '';
        let h1 = document.createElement('h1');
        h1.innerText = error;
        body.append(h1)
    })
    .finally(() => {
        h1.innerText = '';
    })


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
