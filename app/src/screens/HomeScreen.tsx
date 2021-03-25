import React from "react";
import { Background, Header, Paragraph, Button } from "../components";

export default function HomeScreen({ navigation }: any) {
  return (
    <Background>
      <Header>Task</Header>
      <Paragraph>A better way to manage your tasks.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("SignupScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
