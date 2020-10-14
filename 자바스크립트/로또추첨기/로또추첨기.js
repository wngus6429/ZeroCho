
const candidate = Array(45).fill().map((index, number) => number + 1)
console.log(candidate)
//fill 은 배열을 만들기 위해, Array(45)하면 length 는 생기는데 empty 배열
//fill("1") 하면 안에 45개 배열 안에 모두 "1"이 들어감
//하지만 fill 하면 undefined이지만 45개의 공간이 생긴다.
//매서드 체이닝 (연달아서 기능을 만듬)
const arr = [1,2,3]
arr.map((a)=>{})
// for (let n=0; n<=2; n+=1){
//     arr[n] = arr[n] * 10
// }
//