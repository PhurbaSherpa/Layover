import { FirebaseWrapper } from "../firebase/firebasee";

const GOTALLGROUPS = "GOTALLGROUPS";

const gotAllGroups = groups => ({ type: GOTALLGROUPS, groups });

export default allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GOTALLGROUPS:
      return action.groups;
    default:
      return state;
  }
};

export const getAllGroups = () => async dispatch => {
  try {
    await FirebaseWrapper.GetInstance().SetupCollectionListener(
      "groups",
      groups => {
        dispatch(gotAllGroups(groups));
      }
    );
  } catch (error) {
    console.log("all groups error", error);
  }
};

export const addGroup = name => async dispatch => {
  try {
    let groupRef = FirebaseWrapper.GetInstance()
      ._firestore.collection("groups")
      .doc(name);

    groupRef.get().then(async group => {
      if (!group.exists) {
        FirebaseWrapper.GetInstance().CreateNewDocument("groups", name, {
          name
        });
      }
      this.props.navigation.navigate("Groups");
    });
  } catch (error) {
    console.log("add group error", error);
  }
};
