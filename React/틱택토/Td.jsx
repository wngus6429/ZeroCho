import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./TickTec"; //액션을 불러옴

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  // console.log("td rendered");
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(rowIndex === ref.current[0], cellIndex === ref.current[1]);
  //   console.log(dispatch === ref.current[2], cellData === ref.current[3]);
  //   console.log(cellData, ref.current[3]);
  //   ref.current = [rowIndex, cellIndex, dispatch, cellData];
  // }, [rowIndex, cellIndex, dispatch, cellData]);
  //true true true false 나오는거 보니 cellData에 문제가있음

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return; //셀데이터가 있으면 끊어버림, 한번 클릭한 셀은 안 바뀜
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    //몇번째 줄 몇번재 칸인지 액션을 만든것이다
  }, [cellData]); //cellData가 바뀔때마다 기억해둔 함수를 새로만듬
  //밑에 함수를 props로 넣어줄때 불필요한 랜더링이 일어남
  //근데 기억이 너무 강력하면 바뀌는 데이터를 감지를 못하기에 두번째 [cellData]를 적음
  //props로 넣어두는 데이터는 useCallback으로 감싸두는게 좋고,
  //그리고 이 값이 자꾸 바뀔거 같다 라고 하면 두번째 배열에 넣어둠
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;

//클릭 하면 dispatch 클릭셀, 체인지턴도 된다
//dispatch는 state를 바꾸는게 비동기
//redux는 동기적으로 바뀜, useRecuer는 비동기임
//비동기인 스테이트에 따라서 뭔가 처리를 할려면 useEffect를 써야함
//리랜더링 되는지 useEffect와 useRef로 사용할수 있다.
