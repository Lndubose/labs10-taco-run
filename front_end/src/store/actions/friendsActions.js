import axios from "axios";

export const FRIEND_ADD_START = "FRIEND_ADD_START";
export const FRIEND_ADD_COMPLETE = "FRIEND_ADD_COMPLETE";
export const FRIEND_ADD_ERROR = "FRIEND_ADD_ERROR";

export const addFriend = friend => {
  return dispatch => {
    dispatch({ type: FRIEND_ADD_START });
    axios
      .post(`https://production-taco.herokuapp.com/user_friends`, friend)
      .then(res => {
        let obj = JSON.parse(res.config.data);
        dispatch({
          type: FRIEND_ADD_COMPLETE,
          payload: obj
        });
      })
      .catch(err => {
        dispatch({ type: FRIEND_ADD_ERROR, payload: err });
      });
  };
};
