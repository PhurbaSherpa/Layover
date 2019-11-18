import { FirebaseWrapper } from "../firebase/firebasee";

const GOTALLMESSAGES = "GOTALLMESSAGES";

const gotAllMessages = messages => ({ type: GOTALLMESSAGES, messages });

export default allMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case GOTALLMESSAGES:
      return action.messages;
    default:
      return state;
  }
};

export const getAllMessages = () => async dispatch => {
  try {
    await FirebaseWrapper.GetInstance().SetupCollectionListener(
      "messages",
      messages => {
        dispatch(gotAllMessages(messages));
      }
    );
  } catch (error) {
    console.log("all messages error", error);
  }
};

export const addMessage = (text, user) => async dispatch => {
  try {
    let messageRef = FirebaseWrapper.GetInstance()
      ._firestore.collection("messages")
      .doc();

    messageRef.get().then(async message => {
      if (!message.exists) {
        FirebaseWrapper.GetInstance().CreateNewDocument("messages", null, {
          user,
          text
        });
      }
      this.props.navigation.navigate("Chat");
    });
  } catch (error) {
    console.log("add group error", error);
  }
};
