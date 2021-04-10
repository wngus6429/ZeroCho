//클릭 하고나서 실행되는 부분, 변수 a,b,를 위에다가 정의하면
//빈 값을 가져가게 되므로 클릭 했을때 값을 가져가도록 하기위해 안에둠
document.querySelector("#cal").addEventListener('click', () => {
    const a = document.querySelector("#first").value; //클릭 했을때 값 가져오게
    const b = document.querySelector("#second").value;
    //const result = document.querySelector('#result');
    if (a) {
        if (b) {
            const c = a * b //한번 곱해놓고 두고두고 쓰게함
            const result = document.querySelector('#result');
            result.textContent = c;
        } else {
            const result = document.querySelector('#result');
            result.textContent = "두번쨰 값 입력해줘";
        }
    } else {
        const result = document.querySelector('#result');
        result.textContent = "첫번쨰 값 입력해줘";
    }
})

//변수는 실제로 사용될거에 가까이 붙이는게 좋음
//중복되는건 하나로 빼주는게 좋음
//input은 value고
//span은 textcontent 이다.