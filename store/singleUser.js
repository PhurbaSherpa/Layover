import { FirebaseWrapper } from "../firebase/firebasee";

const GOTUSER = "GOTUSER";

const gotUser = user => ({ type: GOTUSER, user });

export default singleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GOTUSER:
      return action.user;
    default:
      return state;
  }
};

export const getUser = id => async dispatch => {
  try {
    await FirebaseWrapper.GetInstance().SetupCollectionListener(
      "users",
      users => {
        for (let i = 0; i < users.length; i++) {
          let user = users[i];
          if (user.id === id) {
            dispatch(gotUser(user));
            break;
          }
        }
      }
    );
  } catch (error) {
    console.log("dqdq", error);
  }
};
