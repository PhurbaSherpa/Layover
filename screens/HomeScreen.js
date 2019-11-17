import * as WebBrowser from "expo-web-browser";
import React from "react";
import Home from "../components/Home";

import { MonoText } from "../components/StyledText";

export default function HomeScreen(props) {
  return <Home navigation={props.navigation} />;
}

HomeScreen.navigationOptions = {
  header: null
};
