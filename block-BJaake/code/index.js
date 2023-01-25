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

