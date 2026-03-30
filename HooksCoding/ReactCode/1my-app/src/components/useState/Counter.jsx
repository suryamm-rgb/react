import { useState } from "react";
export const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClickAdd = () => {
    setCount(count + 1);
  };
  const handleClickSub = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };
  return (
    <>
      <h1>Counter App increment and decrement</h1>
      <p>Count : {count}</p>
      <button onClick={handleClickAdd}>+1</button>
      <button onClick={handleClickSub}> -1 </button>
      <button onClick={reset}>Reset</button>
    </>
  );
};
