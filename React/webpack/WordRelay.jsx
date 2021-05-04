const React = require("react");
const { useState, useRef } = React;

// class WordRelay extends React.Component {
const WordRelay = () => {
  const [word, setWord] = useState("주현님");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label id="label" htmlFor="wordinput">
          글자를 입력하세요
        </label>
        <br />
        <input id="wordinput" className="wordinput" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
//쪼갠 파일을 밖에서도 사용할수 있게. 노드의 모듈시스템
//이걸 함으로서 const WordRelay = require("./WordRelay") 를 본 파일에 할수 있게 된다.

//파일을 쪼갤때 이 3가지를 꼭 적어줘야한다.
// const React = require("react");
// const { Component } = React;
// module.export = WordRelay();
