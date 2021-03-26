import React, { useState, useReducer, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Background, TextInput, TimePicker, Button } from "../components";
import { FormInput } from "./types";
import TimeConverter, { Time } from "../lib/timeConverter";
import { Context as TasksContext } from "../context/tasks";

type TimeAction =
  | { type: "CHANGE_HOURS"; payload: number }
  | { type: "CHANGE_MINUTES"; payload: number }
  | { type: "CHANGE_SECONDS"; payload: number };

export default function AddTaskScreen({ navigation }: any) {
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

  const addTask = () => {
    tasksDispatch({
      type: "ADD_TASK",
      payload: { title: title.value, description: description.value, time },
    });
    navigation.goBack();
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
          error={title.error}
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
          error={description.error}
          errorText={description.error}
          autoCapitalize="none"
        />

        <TimePicker time={time} timeDispatch={timeDispatch} />

        <Button mode="contained" onPress={addTask}>
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
