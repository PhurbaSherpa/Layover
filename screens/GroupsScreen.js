import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Modal,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button
} from "react-native";
import groups, { getAllGroups, addGroup } from "../store/groups";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";

class GroupsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = { modalVisible: false, Group: "" };
  }
  componentDidMount() {
    this.props.getAllGroups();
  }

  render() {
    return (
      <View>
        {this.props.allGroups.length > 0 ? (
          this.props.allGroups.map(group => {
            return <Text>{group.name}</Text>;
          })
        ) : (
          <Text>0</Text>
        )}
        <Button
          title="Create Group"
          onPress={() => this.setState({ modalVisible: true })}
        />
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <TextInput
                  placeholder="Group Name"
                  onChangeText={text => this.setState({ Group: text })}
                />
                <Button
                  disabled={!this.state.Group}
                  title="ADD GROUP"
                  onPress={() => {
                    this.props.addGroup(this.state.Group);
                    this.setState({ modalVisible: false });
                  }}
                />
                <Button
                  title="CLOSE"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

GroupsScreen.navigationOptions = {
  title: "Groups"
};

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  allGroups: state.allGroups
});
const mapDispatchToProps = dispatch => ({
  getAllGroups: () => dispatch(getAllGroups()),
  addGroup: name => dispatch(addGroup(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);
