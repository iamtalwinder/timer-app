import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Background, TextInput } from "../components";

export default function AddTaskScreen() {
  const [title, setTitle] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });

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
