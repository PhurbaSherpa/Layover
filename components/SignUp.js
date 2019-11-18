import React from "react";
import { Text, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { FirebaseWrapper } from "../firebase/firebasee";

export default class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      uploading: true
    };
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted" && status2 !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }
  };

  async saveImage(uri, imageName) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = FirebaseWrapper.GetInstance()
      ._storage.ref()
      .child("images/" + imageName);

    return ref.put(blob);
  }

  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      await this.saveImage(result.uri, `${this.state.userName}-ProfilePic`)
        .then(() => {
          Alert.alert("success");
          this.setState({ uploading: false });
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      await this.saveImage(result.uri, `${this.state.userName}-ProfilePic`)
        .then(() => {
          Alert.alert("success");
          this.setState({ uploading: false });
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  async createUser() {
    try {
      username = this.state.userName;

      let userRef = FirebaseWrapper.GetInstance()
        ._firestore.collection("users")
        .doc(username);
      userRef.get().then(async user => {
        if (user.exists) {
          this.props.navigation.navigate("Login");
        } else {
          FirebaseWrapper.GetInstance().CreateNewDocument("users", username, {
            ...this.state
          });
          this.props.navigation.navigate("Home", {
            ...this.state,
            id: username
          });
        }
      });
    } catch (error) {
      console.log("couldnt create/find user", error);
    }
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.titleContainer}>
        <Text>SIGN UP</Text>
        <Button
          disabled={this.state.uploading}
          title="ENTER"
          onPress={() => {
            this.createUser();
          }}
        />
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={text => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={text => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          <Button title="Take a Picture" onPress={this._takeImage} />
          {image ? (
            <View>
              <Text>Got Image</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%"
  },
  input: {
    marginTop: "5%"
  }
});
