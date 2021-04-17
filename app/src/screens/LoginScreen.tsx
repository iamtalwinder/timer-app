import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import {
  Background,
  BackButton,
  Header,
  TextInput,
  Button,
} from "../components";
import { theme } from "../core/theme";
import { FormInput } from "./types";
import getEnvVars from "../../environment";
import { Context as UserContext } from "../context/user";

const { apiUrl } = getEnvVars();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<FormInput>({ value: "", error: "" });
  const [password, setPassword] = useState<FormInput>({ value: "", error: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/v1/user/login`, {
        email: email.value,
        password: password.value,
      });

      setUser(data);

      navigation.reset({
        index: 0,
        routes: [{ name: "DashboardScreen" }],
      });
    } catch (e) {
      setLoading(false);
      if (e.response) {
        const { data } = e.response;
        switch (data.field) {
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
      <Header>Welcome back.</Header>
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

      <View style={styles.forgotPassword}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={login}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don't have and account? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace("SignupScreen")}
          disabled={loading}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
