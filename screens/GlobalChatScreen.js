import * as WebBrowser from "expo-web-browser";
import React from "react";
import GlobalChat from "../components/GlobalChat";

export default function GlobalChatScreen(props) {
  return <GlobalChat navigation={props.navigation} />;
}

GlobalChatScreen.navigationOptions = {
  title: "Global"
};
