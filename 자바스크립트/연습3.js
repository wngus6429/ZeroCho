// async function loadJson(url) {
//     let response = await fetch(url)

//     if (response.status == 200) {
//       let json = await response.json();
//       return json;
//     }
//     throw new Error(response.status);
// }
// loadJson('no-such-user.json').catch(alert); // Error: 404

// let numbers = Array(10)
//   .fill()
//   .map((v, i) => {
//     return v, i;
//   });
// let gg = numbers.splice(1, 1);
// console.log(numbers, gg);

// let numbers = [];
// for (let n = 0; n <= 95; n++) {
//   numbers.push(n);
// }
// console.log(numbers);

//console.log(Math.floor(Math.random()));

// function camelize(a) {
//   let gg = a.split("-");
//   let pl = [];
//   for (let i = 1; i < gg.length; i++) {
//     let rr = gg[i][0].toUpperCase();
//     let ff = gg[i].slice(1);
//     console.log(rr, ff);
//     let fu = rr + ff;
//     // console.log("fu", fu);
//   }
//   //return pl;
// }
// console.log(camelize("background-color"));
// // camelize("list-style-image");
// //camelize("-webkit-transition"));

function camelize(str) {
  return str
    .split("-") // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) => (index == 0 ? word : word[0].toUpperCase() + word.slice(1))
    )
    .join(""); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}
console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));
