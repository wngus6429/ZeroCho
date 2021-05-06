import React, { memo } from "react";

//const Tryhooks = (props)
//구조 분해 하는게 좋다
const TryHook = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default TryHook;
