import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";
//액션의 타입 이름은 대문자로만, 그게 규칙
//export 를 붙이면 모듈이 된다

//배열에 reduce 함수처럼 줄인다 라는 뜻인데
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      //state.winner = action.winner; 이런식으로 직접 바꾸면 안됨. 불변성 지켜야함
      //새로운 객체를 만들어서 바뀐값만 바꿔줘야함, 이게 객체를 새롭게 복사하는건데
      //스프레드 문법이라고도 함
      return {
        ...state, //얕은 복사
        winner: action.winner, //바뀔 부분만
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return { ...state, tableData, recentCell: [action.row, action.cell] };
    } //객체가 있으면 얕은 복사를 해준다고 보면됨
    //immer라는 라이브러리로 가독성 해결
    //최근에 클릭한 셀도 기억 recentCell
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O", //X, O 서로 바꾸는거
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};
//액션 타입으로 액션이 뭔지 구별하고 SET_WINNER라는 액션이면 그거를 state를 어떻게 바꿀지return에서 기술
//기존 initialState를 바꾸면 안되고

const TickTec = () => {
  //마지막 3번째 지연 초기화 거의 안씀, 첫번째 두번째 만으로 괜찮음
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "0" }); //action.type 과 action.winner
  }, []); //여기 안에서 { } 부분이 객체라고 보면됨
  //컴포넌트에 넣는 이벤트 함수들은 다 useCallback
  //dispatch는 액션을 실행한다고 생각하면된다
  //action을 해석해서 state를 직접 바꿔주는 역할을 하는게 필요한데 이게 reducer이다
  //dispatch 할때마다 reducer부분이 실행되는데
  //state를 어떻게 바꿀지 reducer에 기록을 하는거임

  useEffect(() => {
    const [row, cell] = recentCell;
    //세로, 가로, 대각선 포함 8가지의 경우의 수를 체크하면됨
    //최근에 누른 셀이 어떤건지 아는것도 중요하다
    if (row < 0) {
      return; //-1인 경우에 실행 안되게끔, 위에 초기화 -1로 해둔이유. useEffect는 바로 실행되잖슴
      // 아무런 조작이 없었는데 움직이면 안되니 이런 조건을 둔것임
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true; //가로줄 검사
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true; //세로줄 검사
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true; //대각선 검사
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true; //대각선 검사
    }
    console.log(win, row, cell, tableData, turn);
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all 이 다 차있으니 무승부라는 뜻
      //무승부검사, 테이블이 다 찼는지 확인
      //칸들이 다 차 있다고 치고 혹시라도 3X3 반복문을 돌면서 다 찼는지 확인하는 과정
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        //무승부
        dispatch({ type: RESET_GAME });
      } else {
        //무승부 아니면 다음 사람의 턴으로
        dispatch({ type: CHANGE_TURN });
      }
      //위에 다 검사후 이긴게 아니면 그때 체인지 turn을 하는거지
    }
  }, [recentCell]);

  //state 위에서 구조분해할당 해줬으니 주의
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
      {/* 누군가가 승리하면 화면 표시하는걸로 */}
    </>
  );
};

//실제 클릭 하는건 td가 된다
//Table 밑에 Tr 이 있고 Tr 밑에 Td가 있다, 컴포넌트간 간격이 크다
//데이터 전달이 길다, 이런거 해결로 contextApi를 주로 쓴느데<
//useReducer를 함 써보자
//스테이트 많아지면 관리 힘들어지고, 넘겨줄때도 자식이 useState로 정의되어 있어야하니
// 하나로 해결하기 위해 useReducer를 사용하게 되었다
//dispatch를 table, tr을 거쳐서 td가 받는다
export default TickTec;
