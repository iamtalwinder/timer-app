import React, { useState, useReducer, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Background, TextInput, TimePicker, Button } from "../components";
import { FormInput } from "./types";
import TimeConverter from "../lib/timeConverter";
import { Time } from "../lib/types";
import { Context as TasksContext } from "../context/tasks";
import { Context as UserContext } from "../context/user";
import axios from "axios";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();

type TimeAction =
  | { type: "CHANGE_HOURS"; payload: number }
  | { type: "CHANGE_MINUTES"; payload: number }
  | { type: "CHANGE_SECONDS"; payload: number };

export default function AddTaskScreen({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<FormInput>({ value: "", error: "" });
  const [description, setDescription] = useState<FormInput>({
    value: "",
    error: "",
  });

  const timeReducer = (state: Time, action: TimeAction): Time => {
    switch (action.type) {
      case "CHANGE_HOURS":
        return { ...state, hours: action.payload };

      case "CHANGE_MINUTES":
        return TimeConverter.correct({ ...state, minutes: action.payload });

      case "CHANGE_SECONDS":
        return TimeConverter.correct({ ...state, seconds: action.payload });

      default:
        return state;
    }
  };

  const [time, timeDispatch] = useReducer(
    timeReducer,
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    () => TimeConverter.toHHMMSS(3)
  );

  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const { user } = useContext(UserContext);

  const addTask = async () => {
    try {
      setLoading(true);
      let isSubscribed = true;
      const response = await axios.post(
        `${apiUrl}/v1/task`,
        { title: title.value, description: description.value, time },
        {
          headers: { Authorization: `Bearer ${user.authToken}` },
        }
      );

      if (isSubscribed) {
        tasksDispatch({ type: "ADD_TASK", payload: response.data.task });
        navigation.goBack();
      }

      return () => (isSubscribed = false);
    } catch (e) {
      setLoading(false);
      if (e.response) {
        const { data } = e.response;
        switch (data.field) {
          case "title":
            setTitle((prevState) => ({ ...prevState, error: data.msg }));
            break;

          case "description":
            setDescription((prevState) => ({ ...prevState, error: data.msg }));
            break;

          default:
            alert(data.msg);
            break;
        }
      } else {
        alert("Something went wrong! Please try again");
      }
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          label="Title"
          returnKeyType="next"
          mode="flat"
          value={title.value}
          onChangeText={(text: string) => setTitle({ value: text, error: "" })}
          error={!!title.error}
          errorText={title.error}
          autoCapitalize="none"
        />

        <TextInput
          label="Description"
          returnKeyType="next"
          mode="flat"
          value={description.value}
          onChangeText={(text: string) =>
            setDescription({ value: text, error: "" })
          }
          error={!!description.error}
          errorText={description.error}
          autoCapitalize="none"
        />

        <TimePicker time={time} timeDispatch={timeDispatch} />

        <Button
          mode="contained"
          onPress={addTask}
          loading={loading}
          disabled={loading}
        >
          Add
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
