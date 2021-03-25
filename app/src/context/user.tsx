import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  authToken: string;
  info: {
    name: string;
    email: string;
  };
};

const initialState: State = { authToken: "", info: { name: "", email: "" } };

export const Context = createContext<{
  user: State;
  setUser: React.SetStateAction<any>;
}>({ user: initialState, setUser: () => null });

Context.displayName = "UserContext";

export default function ContextProvider({ children }: Props) {
  const [user, setUser] = useState<State>(initialState);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}
