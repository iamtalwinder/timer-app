import React, { useState, useEffect } from "react";
import { Card, Button, Text } from "react-native-paper";
import TimeConverter from "../lib/timeConverter";
import { Time as TimeType } from "../lib/types";
import { Task as TaskType } from "../context/types";

type Props = {
  task: TaskType;
};

export default function Task({ task }: Props) {
  const [timer, setTimer] = useState<boolean>(false);
  const [time, setTime] = useState<TimeType>(task.time);

  useEffect(() => {
    const seconds = TimeConverter.toSeconds(time);

    if (!seconds) {
      alert(`${task.title} finished`);
      setTimer(false);
      setTime(task.time);
    }

    const timerId: any =
      timer &&
      setTimeout(() => setTime(TimeConverter.toHHMMSS(seconds - 1)), 1000);

    return () => clearTimeout(timerId);
  }, [time, timer]);

  return (
    <Card.Title
      title={task.title}
      subtitle={task.description}
      left={() => (
        <Text>{`${time.hours}:${time.minutes}:${time.seconds}`}</Text>
      )}
      right={(props) => (
        <Button {...props} onPress={() => setTimer((prevState) => !prevState)}>
          {timer ? "Stop" : "Start"}
        </Button>
      )}
    />
  );
}
