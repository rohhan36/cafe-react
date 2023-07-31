import React, { useReducer, useEffect } from "react";
import classes from "./Counter.module.css";

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
  SET: "set",
};

const countReducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { count: state.count + 1 };

    case ACTION.DECREMENT:
      return { count: state.count > 0 ? state.count - 1 : state.count };

    case ACTION.RESET:
      return { count: 0 };

    case ACTION.SET:
      return { count: action.value };

    default:
      return state;
  }
};

const Counter = React.forwardRef((props, ref) => {
  const [countState, countDispatch] = useReducer(countReducer, { count: props.default });

  const increment = () => {
    countDispatch({ type: ACTION.INCREMENT });
  };

  const decrement = () => {
    countDispatch({ type: ACTION.DECREMENT });
  };

  const reset = () => {
    countDispatch({ type: ACTION.RESET });
  };

  const set = (num) => {
    countDispatch({ type: ACTION.SET, value: num });
  };

  useEffect(() => {
    reset();
  }, [props.reset]);

  useEffect(() => {
    set(props.default);
  }, [props.default]);

  return (
    <div className={classes.counter}>
      <button onClick={decrement}>-</button>
      <div ref={ref} className={classes.counterNumber}>
        {countState.count}
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
});

export default Counter;
