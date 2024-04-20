"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React from "react";
import { Button } from "./ui/button";
import { decrement, increment } from "@/features/counter/counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-4 w-28">
      <span>Counter: {count}</span>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </div>
  );
};

export default Counter;
