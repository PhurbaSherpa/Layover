import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Connect from "../components/Connect";

export default ConnectScreen = () => {
  return <Connect />;
};

ConnectScreen.navigationOptions = {
  title: "Connect"
};
