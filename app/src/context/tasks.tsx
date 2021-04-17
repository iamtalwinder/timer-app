import React, { useReducer, createContext } from "react";
import { Task } from "./types";

type Props = {
  children: React.ReactNode;
};

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "ADD_TASKS"; payload: Task[] };

const initialState: Task[] = [];

export const Context = createContext<{
  tasks: Task[];
  dispatch: React.Dispatch<any>;
}>({ tasks: initialState, dispatch: () => null });

Context.displayName = "TasksContext";

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "ADD_TASKS":
      return action.payload;

    default:
      return state;
  }
}

export default function ContextProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ tasks, dispatch }}>{children}</Context.Provider>
  );
}
