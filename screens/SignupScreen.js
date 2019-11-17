import * as WebBrowser from "expo-web-browser";
import React from "react";
import SignUp from "../components/SignUp";

import { MonoText } from "../components/StyledText";

export default function SignUpScreen(props) {
  return <SignUp navigation={props.navigation} />;
}

SignUpScreen.navigationOptions = {
  title: "Sign Up"
};
