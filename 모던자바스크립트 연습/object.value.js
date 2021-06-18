let user = {
  name: "John",
  age: 30,
  game: 40,
};

function count(obj) {
  return Object.keys(obj).length;
}

console.log(count(user)); // 2
