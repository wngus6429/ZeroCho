import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>
            {""}
          </Td>
        ))}
    </tr>
  );
});
//tr은 세로
//td는 가로

export default Tr;

//memo를 하면 props만 바뀌면 리랜더링이 안되기 때문에 성능최적화 가능
