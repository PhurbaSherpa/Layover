import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "./Icon";
import SuqareX from "react-native-vector-icons/Entypo";
import { FirebaseWrapper } from "../firebase/firebasee";

export default class SingleImage extends React.Component {
  constructor(props) {
    super();
    this.state = { image: "" };
  }

  async componentDidMount() {
    const ref = FirebaseWrapper.GetInstance()._storage.ref(
      `images/${this.props.username}-ProfilePic`
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
      <View>
        <Text style={styles.username}>{this.props.username}</Text>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Icon style={styles.left} name="check-square" size="50" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SuqareX style={styles.right} name="squared-cross" size="50" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 320,
    resizeMode: "contain"
  },
  buttons: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  left: { marginRight: "20%" },
  right: { marginLeft: "20%" },
  username: {
    justifyContent: "center",
    alignItems: "center"
  }
});
