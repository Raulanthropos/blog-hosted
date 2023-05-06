import { FETCH_BLOGS, SET_ID, SET_USER, ADD_POST, SET_ACCESS_TOKEN } from "../actions";

const initialState = {
  blogPosts: [],
  isLoading: true,
  id: "",
  user: [],
  accessToken: localStorage.getItem("accessToken"),
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN: // add a new case to handle setting the accessToken
    return {
      ...state,
      accessToken: action.payload
    }
    case FETCH_BLOGS:
      return {
        ...state,
        blogPosts: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        blogPosts: [...state.blogPosts, action.payload],
        isLoading: false,
      };
    case SET_ID: {
      console.log(action.payload);
      return {
        ...state,
        id: action.payload,
        isLoading: false,
      };
    }
    case SET_USER: {
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
