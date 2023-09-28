import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
    LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const initalState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-profile")
    ? JSON.parse(sessionStorage.getItem("ytc-access-profile"))
    : null,
  loading: false,
};
export const authReaducer = (prevState = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };
    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };
    case LOG_OUT:
          return {
              ...prevState,
              accessToken: null,
              user:null,
      };
    default:
      return prevState;
  }
};
