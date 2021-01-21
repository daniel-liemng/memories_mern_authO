import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // console.log("aaa", action?.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    default:
      return state;
  }
};

export default reducer;
