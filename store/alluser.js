import { FirebaseWrapper } from "../firebase/firebasee";

const GOTALLUSERS = "GOTALLUSERS";

const gotAllUsers = users => ({ type: GOTALLUSERS, users });

export default allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GOTALLUSERS:
      return action.users;
    default:
      return state;
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    await FirebaseWrapper.GetInstance().SetupCollectionListener(
      "users",
      users => {
        dispatch(gotAllUsers(users));
      }
    );
  } catch (error) {
    console.log("all users error", error);
  }
};
