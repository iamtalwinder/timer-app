import { Time } from "../lib/types";

export type Task = {
  title: string;
  description: string;
  time: Time;
};

export type User = {
  authToken: string;
  info: {
    name: string;
    email: string;
  };
};
