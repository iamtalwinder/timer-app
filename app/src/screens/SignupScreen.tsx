import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Background,
  BackButton,
  Header,
  TextInput,
  Button,
} from "../components";
import { theme } from "../core/theme";
import { FormInput } from "./types";

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState<FormInput>({ value: "", error: "" });
  const [email, setEmail] = useState<FormInput>({ value: "", error: "" });
  const [password, setPassword] = useState<FormInput>({ value: "", error: "" });

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Welcome back.</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: "" })}
        error={email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained">Sign Up</Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
