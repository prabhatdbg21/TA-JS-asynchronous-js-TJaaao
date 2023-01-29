let basicURL = `https://basic-todo-api.vercel.app/api/todo`;
let rootElm = document.querySelector('.list-of-todos');
let inputText = document.querySelector("#text");


function createUI (info){
    info.todos.forEach((eachinfo) => {
        let li = document.createElement ("li");
        let input = document.createElement ("input");
        input.type = "checkbox";

        let p = document.createElement ("p");
        p.innerText = eachinfo.title;

        let span = document.createElement ("span");
        span.innerText = "X" ;
        span.addEventListener ("click" , () => {
            fetch(basicURL + `/${eachinfo._id}`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(fetchdata())
        });

        li.append (input , p , span);
        rootElm.append (li)
    });
}

function handleInput(event){
    let value = event.target.value;
    if (event.keyCode === 13 && value !== 0){
        let data = {
            "todo": {
              "title": `${value}`,
              "isCompleted": false,
            }
        };
        fetch(basicURL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
          .then(fetchdata())
        ;
    }
}

function fetchdata(){
    rootElm.innerHTML = '';
    fetch(basicURL)
    .then((res) => res.json())
    .then((info) => {
        createUI (info)
    });
}
fetchdata()

inputText.addEventListener ("keyup" , handleInput);

