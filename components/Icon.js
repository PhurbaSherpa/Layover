import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function Icon(props) {
  return (
    <FontAwesome
      name={props.name}
      size={props.size || 26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
