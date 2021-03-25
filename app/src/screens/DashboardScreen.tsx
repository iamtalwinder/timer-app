import React from "react";
import { Background, Header, Paragraph, Button } from "../components";

export default function DashboardScreen({ navigation }: any) {
  return (
    <Background>
      <Header>Dashboard</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
}
