(function() {
    let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
    let newsElm = document.querySelector(".news");
    let select = document.querySelector("#options");
    let main = document.querySelector(".main");
    let errorElm = document.querySelector(".error-message");
    let allNews = [];

    function handleErrorMessage(message = 'Something went wrong!') {
        main.style.display = `none`;
        errorElm.innerText = message;
    }

    function handleSpinner(status = false){
        if (status) {
            newsElm.innerHTML = `<div class="donut"></div>` ;
        }
    }


    let body = document.querySelector("body");

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

    function init(){
        handleSpinner(true);
        fetch(url)
        .then((resolve) => {
            if(!resolve.ok){
                throw new Error (`Error happend: ${resolve.status}`)
            }
            return resolve.json()
        })
        .then((news) => {
            handleSpinner(false);
            allNews = news;
            addNews(news);
            let allSources = Array.from(new Set (news.map((n) => n.newsSite)));
            addOption(allSources)
        })
        .catch((error) => {
            handleErrorMessage(error);
        })
        .finally(() => {
            handleSpinner();
        })
    }


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

    if(navigator.onLine) {
        init();
    }
    else {
        handleErrorMessage("check your internet connection");
    }
})();