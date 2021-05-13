import React, { useCallback } from "react";
import { CLICK_CELL } from "./TickTec"; //액션을 불러옴

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return; //셀데이터가 있으면 끊어버림, 한번 클릭한 셀은 안 바뀜
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    //몇번째 줄 몇번재 칸인지 액션을 만든것이다
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;

//클릭 하면 dispatch 클릭셀, 체인지턴도 된다
//dispatch는 state를 바꾸는게 비동기
//redux는 동기적으로 바뀜, useRecuer는 비동기임
//비동기인 스테이트에 따라서 뭔가 처리를 할려면 useEffect를 써야함
