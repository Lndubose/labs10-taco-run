import axios from "axios";

export const FRIENDS_FETCH_START = "FRIENDS_FETCH_START";
export const FRIENDS_FETCH_COMPLETE = "FRIENDS_FETCH_COMPLETE";
export const FRIENDS_FETCH_ERROR = "FRIENDS_FETCH_ERROR";

export const FRIEND_ADD_START = "FRIEND_ADD_START";
export const FRIEND_ADD_COMPLETE = "FRIEND_ADD_COMPLETE";
export const FRIEND_ADD_ERROR = "FRIEND_ADD_ERROR";

export const FRIEND_DELETE_START = "FRIEND_DELETE_START";
export const FRIEND_DELETE_COMPLETE = "FRIEND_DELETE_COMPLETE";
export const FRIEND_DELETE_ERROR = "FRIEND_DELETE_ERROR";

export const fetchFriends = id => {
  return dispatch => {
    dispatch({ type: FRIENDS_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users_friends/${id}`)
      .then(res => {
        dispatch({ type: FRIENDS_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FRIENDS_FETCH_ERROR });
      });
  };
};

export const addFriend = friend => {
  return dispatch => {
    dispatch({ type: FRIEND_ADD_START });
    axios
      .post(`https://production-taco.herokuapp.com/users_friends`, friend)
      .then(() => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_friends/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            dispatch({
              type: FRIEND_ADD_COMPLETE,
              payload: res.data
            });
          });
      })
      .catch(err => {
        dispatch({ type: FRIEND_ADD_ERROR, payload: err });
      });
  };
};

export const deleteFriend = (user_id, friends_id) => {
  return dispatch => {
    dispatch({ type: FRIEND_DELETE_START });
    axios
      .delete(
        `https://production-taco.herokuapp.com/users_friends/user/${user_id}/friend/${friends_id}`
      )
      .then(res => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_friends/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            dispatch({
              type: FRIEND_DELETE_COMPLETE,
              payload: res.data
            });
          });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FRIEND_DELETE_ERROR, payload: err });
      });
  };
};
