- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
/*
let first = new Promise ((res, rej) => {
    setTimeout(() => res(`after 1 sec`), 1000)
});
let second = new Promise ((res, rej) => {
    setTimeout(() => res(`after 2 sec`), 2000)
});
let third = new Promise ((res, rej) => {
    setTimeout(() => res(`after 3 sec`), 3000)
});
let four = new Promise ((res, rej) => {
    setTimeout(() => res(`after 4 sec`), 4000)
});

let all = Promise.all([first, second, third, four])
    .then((info) => console.log(info))
;

OR
*/

let time = [1, 2, 3, 4];
let timePromise = time.map(
  (second) => new Promise((res) => {
    setTimeout(() => res(Math.random()), second * 1000)
  })
);

Promise.all(timePromise).then(console.log);
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
const usersnames = ['getify', 'gaearon', 'AArnott', 'piranha', 'sophiebits'];
/*
const usersnamesData = Promise.all(
    usernames.map((user) =>
        fetch(`https://api.github.com/users/${user}`)
        .then((res) => res.json())
    )   
).then((users) => {
    users.map((user) => {
        console.log(user.followers)
    })
})

OR
*/
let userPromises = usersnames.map((user) => {
  return fetch(`https://api.github.com/users/${user}`)
    .then((res) => res.json())
})

Promise.all(userPromises)
  .then((users) => {
    users.forEach((user) => console.log(user.followers))
  })
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let url1 = fetch(`https://random.dog/woof.json`)
    .then((res) => res.json());

let url2 = fetch(`https://aws.random.cat/meow`)
    .then((res) => res.json());

Promise.race([url1, url2])
    .then((info) => console.log(info))
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three])
    .then((info) => console.log(info))

Promise.all([one, two, three])
    .then((info) => console.log(info))   // Uncaught (in promise) Error: Whoops!  (Promise.all not working)
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// outout  (3) ['Arya', 'Sam', {…}]
// time taken 1000ms
```
