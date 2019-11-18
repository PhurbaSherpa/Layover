import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Message from "./Message";

export default MessageList = props => {
  const { messages } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          return <Message item={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "10%"
  },
  item: {
    fontSize: 18,
    height: 44
  }
});
