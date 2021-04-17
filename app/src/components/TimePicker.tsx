import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Time } from "../lib/types";

type Props = {
  time: Time;
  timeDispatch: React.Dispatch<any>;
};

export default function TimePicker({ time, timeDispatch }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="HH"
        value={time.hours.toString()}
        keyboardType="number-pad"
        onChangeText={(text: string) => {
          if (text === "") text = "0";

          timeDispatch({ type: "CHANGE_HOURS", payload: parseInt(text) });
        }}
      />

      <TextInput
        style={styles.input}
        label="MM"
        value={time.minutes.toString()}
        keyboardType="number-pad"
        onChangeText={(text: string) => {
          if (text === "") text = "0";

          timeDispatch({ type: "CHANGE_MINUTES", payload: parseInt(text) });
        }}
      />

      <TextInput
        style={styles.input}
        label="SS"
        value={time.seconds.toString()}
        keyboardType="number-pad"
        onChangeText={(text: string) => {
          if (text === "") text = "0";

          timeDispatch({ type: "CHANGE_SECONDS", payload: parseInt(text) });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 12,
    justifyContent: "center",
  },
  input: {
    width: "20%",
    marginLeft: 8,
  },
});
