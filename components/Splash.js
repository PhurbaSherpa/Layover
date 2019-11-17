import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default Splash = props => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.inputsContainer}>
        <Text>WELCOME TO LAYOVER</Text>
        <Button
          onPress={() => props.navigation.navigate("Login")}
          title="Log In"
        />
        <Button
          onPress={() => props.navigation.navigate("SignUp")}
          title="Sign Up"
        />
      </View>
    </View>
  );
};

Splash.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputsContainer: {
    marginTop: "5%",
    alignItems: "center",
    width: "100%"
  },
  input: {
    marginTop: "5%"
  }
});
