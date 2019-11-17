import React from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../store/alluser";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from "react-native";
import SingleImage from "./SingleImage";

class Connect extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    return (
      <ScrollView style={styles.headerContainer}>
        {this.props.allUsers.map(user => {
          return <SingleImage username={user.id} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: "3%"
  }
});

const mapStateToProps = state => ({ allUsers: state.allUsers });
const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
