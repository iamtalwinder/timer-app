import { Time } from "../lib/types";

export type Task = {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  time: Time;
  date: string;
};

export type User = {
  authToken: string;
  info: {
    id: string;
    name: string;
    email: string;
  };
};
