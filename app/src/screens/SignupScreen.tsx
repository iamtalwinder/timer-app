import React, { useState, useContext } from "react";
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
import axios from "axios";
import getEnvVars from "../../environment";
import { Context as UserContext } from "../context/user";

const { apiUrl } = getEnvVars();

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState<FormInput>({ value: "", error: "" });
  const [email, setEmail] = useState<FormInput>({ value: "", error: "" });
  const [password, setPassword] = useState<FormInput>({ value: "", error: "" });

  const { setUser } = useContext(UserContext);

  const signup = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/v1/user/register`, {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      setUser(data);

      navigation.reset({
        index: 0,
        routes: [{ name: "DashboardScreen" }],
      });
    } catch (e) {
      console.log(e);
      if (e.response) {
        const { data } = e.response;
        switch (data.field) {
          case "name":
            setName((prevState) => ({ ...prevState, error: data.msg }));
            break;

          case "email":
            setEmail((prevState) => ({ ...prevState, error: data.msg }));
            break;

          case "password":
            setPassword((prevState) => ({ ...prevState, error: data.msg }));
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
      <BackButton goBack={navigation.goBack} />
      <Header>Sign Up</Header>
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
        error={!!email.error}
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
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={signup}>
        Sign Up
      </Button>

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
