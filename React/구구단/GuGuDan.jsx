const React = require("react");
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const inputref = React.useRef(null); //각 뒤에 괄호는 초기값

  const onChangeform = (e) => {
    setValue(e.target.value);
  };

  const onSubmitform = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult((예전값) => {
        return "정답" + value;
      });
      //setResult("정답:" + value); //이렇게 해도 문제는 없던데 흠.
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      inputref.current.focus(); //클래스랑 좀 다르지 ㅎㅎ
    } else {
      setResult("땡");
      setValue("");
      inputref.current.focus(); //클래스 접근 방법도 알고 있어야한다
    }
  };
  return (
    <>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmitform}>
        <input ref={inputref} onChange={onChangeform} value={value} />
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
