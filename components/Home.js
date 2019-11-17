import React from "react";
import { getUser } from "../store/singleUser";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import Icon from "./Icon";
import { FirebaseWrapper } from "../firebase/firebasee";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = { image: "" };
  }

  async componentDidMount() {
    const userName = this.props.navigation.getParam("id");
    await this.props.getUser(userName);
    const ref = FirebaseWrapper.GetInstance()._storage.ref(
      `images/${userName}-ProfilePic`
    );
    try {
      const url = await ref.getDownloadURL();
      this.setState({ image: url, downloading: false });
    } catch (error) {
      console.log("downolaoding error", error);
    }
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.text}>LAYOVER</Text>
        <Icon size="200" name="plane" />
        <Text style={styles.footer}>
          <Icon name="copyright" size="10" /> LayOver
        </Text>
        <Text>{`WELCOME BACK ${this.props.user.firstName}`}</Text>
        <Image style={styles.image} source={{ uri: this.state.image }} />
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
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  text: {
    fontSize: 70
  }
});

const mapStateToProps = state => ({
  user: state.singleUser
});
const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(getUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
