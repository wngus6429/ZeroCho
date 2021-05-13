import React from "react";
import Td from "./Td";

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>
            {""}
          </Td>
        ))}
    </tr>
  );
};
//tr은 세로
//td는 가로

export default Tr;
