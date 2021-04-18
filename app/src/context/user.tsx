import React, { createContext, useState } from "react";
import { User } from "./types";

type Props = {
  children: React.ReactNode;
};

const initialState: User = {
  authToken: "",
  info: {
    id: "",
    name: "",
    email: "",
  },
};

export const Context = createContext<{
  user: User;
  setUser: React.SetStateAction<any>;
}>({ user: initialState, setUser: () => null });

Context.displayName = "UserContext";

export default function ContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>(initialState);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}
