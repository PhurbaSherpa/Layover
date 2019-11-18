import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  InputAccessoryView,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { getAllMessages, addMessage } from "../store/messages";
import MessageList from "./MessageList";

class GlobalChat extends React.Component {
  constructor(props) {
    super();
    this.state = { message: "", username: "" };
  }
  componentDidMount() {
    this.props.getAllMessages();
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        style={styles.container}
        behavior="padding"
        enabled
      >
        <View style={styles.container}>
          {this.props.messages && this.props.messages.length > 0 ? (
            <MessageList messages={this.props.messages} />
          ) : (
            <Text>No messages</Text>
          )}

          <View style={styles.newMessage}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={text => this.setState({ username: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="New message"
              onChangeText={text => this.setState({ message: text })}
            />
            <Button
              title="SEND"
              disabled={!this.state.message || !this.state.username}
              onPress={() => {
                this.props.addMessage(this.state.message, this.state.username);
                this.setState({ message: "" });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllMessages: () => dispatch(getAllMessages()),
  addMessage: (message, username) => dispatch(addMessage(message, username))
});

const mapStateToProps = state => ({
  messages: state.allMessages
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChat);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  newMessage: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    paddingTop: "5%",
    marginTop: "10%",
    bottom: "5%",
    justifyContent: "center"
  },
  input: {
    width: "20%",
    marginRight: "5%",
    marginLeft: "5%",

    borderColor: "gray",
    borderWidth: 1
  }
});
