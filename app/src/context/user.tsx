import React, { createContext, useState } from "react";
import { User } from "./types";

type Props = {
  children: React.ReactNode;
};

const initialState: User = {
  authToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdhN2U2OGI0OTNlZDIwNzQyMDI4ZmIiLCJuYW1lIjoiVGFsd2luZGVyIiwiZW1haWwiOiJzaW5naEBnbWFpbC5jb20iLCJpYXQiOjE2MTg2NDExMTV9._izeyOM7DbQc3m34tIwY38jPx8gy0NhXCwD0OmwMs1E",
  info: {
    id: "607a7e68b493ed20742028fb",
    name: "Talwinder",
    email: "singh@gmail.com",
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
