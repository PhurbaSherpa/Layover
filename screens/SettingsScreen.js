import React from "react";
import { View, Button } from "react-native";
export default function SettingsScreen(props) {
  return (
    <View>
      <Button
        title="LogOut"
        onPress={() => props.navigation.navigate("Root")}
      />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "app.json"
};
