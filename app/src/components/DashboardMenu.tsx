import React, { useState } from "react";
import { Menu, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function DashboardMenu() {
  const [visible, setVisible] = useState<boolean>(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
    >
      <Menu.Item
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        }}
        title="Log Out"
      />
    </Menu>
  );
}
