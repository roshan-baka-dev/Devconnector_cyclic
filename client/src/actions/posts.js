import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// GET posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    // console.log('getPosts');
    // console.log(res);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};
// ADD LIKES

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    // console.log('addLikes');
    // console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// REMOVE LIKES

export const removeLike = (id) => async (dispatch) => {
  try {
    // console.log('removeLikes');
    const res = await axios.put(`/api/posts/unlike/${id}`);

    // console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// DELETE POST

export const deletePost = (id) => async (dispatch) => {
  try {
    // console.log('removeLikes');
    await axios.delete(`/api/posts/${id}`);

    // console.log(res);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// ADD POST

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// GET posts

export const getPost = (id) => async (dispatch) => {
  try {
    // console.log('getPost');
    const res = await axios.get(`/api/posts/${id}`);
    // console.log(res);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// ADD comment

export const addComment = (id, comment) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    // console.log('getPost');
    const res = await axios.post(`/api/posts/comment/${id}`, comment, config);
    // console.log(res);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};

// REMOVE comment

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Deleted', 'danger'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.status },
    });
  }
};
