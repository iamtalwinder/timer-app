import React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  LoginScreen,
  SignupScreen,
  DashboardScreen,
  AddTaskScreen,
} from "./src/screens";
import { theme } from "./src/core/theme";
import UserContextProvider from "./src/context/user";
import TasksContextProvider from "./src/context/tasks";
import { DashboardMenu } from "./src/components";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <UserContextProvider>
        <TasksContextProvider>
          <View
            style={{
              flex: 1,
              width: "100%",
              maxWidth: 380,
              alignSelf: "center",
            }}
          >
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="DashboardScreen"
                screenOptions={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                  },
                  headerTintColor: theme.colors.surface,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen
                  options={{
                    headerShown: true,
                    title: "Task",
                    headerRight: DashboardMenu,
                  }}
                  name="DashboardScreen"
                  component={DashboardScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: true,
                    title: "Add Task",
                  }}
                  name="AddTaskScreen"
                  component={AddTaskScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </TasksContextProvider>
      </UserContextProvider>
    </PaperProvider>
  );
}
