import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Background, Paragraph, Task } from "../components";
import { theme } from "../core/theme";
import { Context as TasksContext } from "../context/tasks";

export default function DashboardScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);

  const { tasks } = useContext(TasksContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10);
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <IconButton
          style={styles.iconButton}
          icon="plus"
          color={theme.colors.surface}
          size={30}
          onPress={() => navigation.navigate("AddTaskScreen")}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}

        {!loading && !tasks.length && (
          <Paragraph>Click plus button to add a task</Paragraph>
        )}

        {!loading &&
          !!tasks.length &&
          tasks.map((task, index) => <Task key={index} task={task} />)}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  iconButton: {
    backgroundColor: theme.colors.primary,
    position: "absolute",
    right: 10,
    bottom: 25,
  },
});
