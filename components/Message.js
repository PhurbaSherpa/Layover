import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { FirebaseWrapper } from "../firebase/firebasee";

export default class Message extends React.Component {
  constructor(props) {
    super();
    this.state = { image: "" };
  }

  async componentDidMount() {
    const ref = FirebaseWrapper.GetInstance()._storage.ref(
      `images/${this.props.item.user}-ProfilePic`
    );
    try {
      const url = await ref.getDownloadURL();
      this.setState({ image: url });
    } catch (error) {
      console.log("downolaoding error", error);
    }
  }

  render() {
    return (
      <View style={styles.message}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <Text style={styles.user}>{this.props.item.user}: </Text>
        <Text style={styles.text}>{this.props.item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    flexDirection: "row",
    marginLeft: "3%",
    marginTop: "3%"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  user: {
    marginLeft: "3%"
  },
  text: {
    flex: 1,
    flexWrap: "wrap"
  }
});
