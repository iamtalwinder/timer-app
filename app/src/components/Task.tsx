import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Text, Menu, IconButton } from "react-native-paper";
import axios from "axios";
import TimeConverter from "../lib/timeConverter";
import { Time } from "../lib/types";
import { Task as TaskType } from "../context/types";
import { Context as TasksContext } from "../context/tasks";
import { Context as UserContext } from "../context/user";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();

type Props = {
  task: TaskType;
};

export default function Task({ task }: Props) {
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const [timer, setTimer] = useState<boolean>(false);
  const [time, setTime] = useState<Time>(task.time);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const deleteTask = async () => {
    try {
      setTimer(false);
      setMenuVisible(false);

      tasksDispatch({ type: "DELETE_TASK", payload: task._id });

      await axios.delete(`${apiUrl}/v1/task`, {
        data: { taskId: task._id },
        headers: { Authorization: `Bearer ${user.authToken}` },
      });
    } catch (e) {
      console.log(e);
      alert("Unable to delete task. Try again!");
    }
  };

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

  useEffect(() => {
    setTime(task.time);
  }, [task]);

  return (
    <Card.Title
      title={task.title}
      subtitle={task.description}
      left={() => (
        <Text>{`${time.hours}:${time.minutes}:${time.seconds}`}</Text>
      )}
      right={() => (
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              setTimer((prevState) => !prevState);
            }}
            icon={timer ? "pause" : "play"}
            title={timer ? "Stop" : "Start"}
          />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("EditTaskScreen", {
                task: task,
              });
            }}
            icon="pencil"
            title="Edit"
          />
          <Menu.Item onPress={deleteTask} icon="delete" title="Delete" />
        </Menu>
      )}
    />
  );
}
