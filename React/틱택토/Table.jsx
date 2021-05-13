import React, { memo } from "react";
import Tr from "./Tr";

const Table = memo(({ tableData, dispatch }) => {
  return (
    <>
      <table>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
          ))}
      </table>
    </>
  );
});
//요소가 3개인 배열이 만들어짐 그 배열을 각각 TR로 만드는 거임
//rowData 는 ['','',''] 이게 되는거임
//여기서 i가 몇번째 줄인지를 나타낸다
export default Table;
