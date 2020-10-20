const btn = document.querySelector("#btn")

let inputt = document.querySelector("#input").textContent

let bang = [];
btn.addEventListener("click", () => {
    
    let array = [1,2,3,4,5]
    for (let index = 0; index < array.length; index++) {

        array[index] = array[index] * 5 * 975 * 45678;
    }
    bang.push(array)
    console.log("뱅",bang)
})
