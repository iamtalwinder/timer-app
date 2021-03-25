import React from "react";
import ReactNative, { View, StyleSheet, Text, Platform } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ errorText, ...props }: any) {
  const onFocus = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputFocusEventData>
  ) => {
    if (Platform.OS === "web") (e.target as any).style.outline = "none";
  };
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        mode="outlined"
        onFocus={onFocus}
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
