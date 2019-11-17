import React from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { FirebaseWrapper } from "../firebase/firebasee";

export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = { name: "", pass: "" };
    this.Login = this.Login.bind(this);
  }
  async Login() {
    try {
      const { pass, name } = this.state;
      let userRef = await FirebaseWrapper.GetInstance()
        ._firestore.collection("users")
        .doc(name);
      userRef.get().then(user => {
        const { userName, password } = user.data();
        if (userName === name && password === pass) {
          this.props.navigation.navigate("Home", { ...user.data() });
        }
      });
    } catch (error) {
      console.log(error);
      console.log("couldnt find account/ go sign up");
    }
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Text>Login</Text>
        <Button title="ENTER" onPress={() => this.Login()} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={text => this.setState({ name: text })}
          value={this.state.userName}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={text => this.setState({ pass: text })}
          value={this.state.password}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: "5%"
  }
});
