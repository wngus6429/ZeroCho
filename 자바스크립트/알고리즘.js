var A = 5;
var B = 8;
var C = 4;
console.log((A + B) % C);
console.log((A % C) + ((B % C) % C));
console.log((A * B) % C);
console.log(((A % C) * (B % C)) % C);
