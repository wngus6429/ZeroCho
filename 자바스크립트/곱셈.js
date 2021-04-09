document.querySelector("#cal").addEventListener('click', () => {
    const a = document.querySelector("#first").value
    const b = document.querySelector("#second").value    
    if (a) {
        if (b) {
            document.querySelector('#result').textContent = a * b;
        } else {
            document.querySelector('#result').textContent = "두번쨰 값 입력해줘";
        }
    } else {
        document.querySelector('#result').textContent = "첫번쨰 값 입력해줘";
    }
})




//input은 value고
//span은 textcontent 이다.