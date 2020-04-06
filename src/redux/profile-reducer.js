import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";

let initialStore = {
  postsData: [
    {
      id: 1,
      message: "hello, how u feel?",
      img: "https://clck.ru/MDDf7",
      likeCounts: 0
    },
    {
      id: 2,
      message: "where my money?",
      img: "https://clck.ru/MDDgs",
      likeCounts: 95
    },
    {
      id: 3,
      message: "i need help",
      img: "https://clck.ru/MDDj5",
      likeCounts: 110
    },
    {
      id: 4,
      message: "i want use props",
      img: "https://clck.ru/MDDid",
      likeCounts: 11
    }
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialStore, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        img: "https://clck.ru/MDDf7",
        likeCounts: 0
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: ""
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      };
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(p => p.id !== action.postId)
      };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    case SAVE_PROFILE_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

export const addPostActionCreator = newPostText => ({
  type: ADD_POST,
  newPostText
});
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_STATUS, status });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = photos => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});
export const saveProfileSuccess = profile => ({
  type: SAVE_PROFILE_SUCCESS,
  profile
});

export const getUserProfile = userId => async dispatch => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export const getStatus = userId => async dispatch => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = status => async dispatch => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
export const savePhoto = file => async dispatch => {
  const response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile = profile => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
