import React, { memo } from "react";

//애는 함수 컴포넌트라고 한다.
//useState나 useEffect를 써야 훅이라고 할수 있음
//퓨어 컴포넌트를 적용하고 싶으면 memo 사용
//컴포넌트를 다른 컴포넌트로 감싸는걸 하이오더 컴포넌트, 고차컴포넌트
//HOC라고도 한다
//함수 컴포넌트에서는 purecomponent 사용 불가
//애를 purecomponent처럼 쓸려고 memo 사용
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
