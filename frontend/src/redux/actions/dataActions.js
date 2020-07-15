import { GET_USER, GET_PROJECTS, ADD_PROJECT, GET_DATES, UPDATE_INDEX } from "../types";
import axios from "axios";

export const getUserData = (user) => (dispatch) => {
  axios.get(`https://api.github.com/users/${user}`).then((res) => {
    dispatch({
      type: GET_USER,
      payload: res,
    });
  });
};

export const getProjects = (projects) => (dispatch) => {
  let data = [];
  let promises = [];
  projects.forEach((project) => {
    promises.push(
      axios.get(`https://api.github.com/repos/${project}/pulls`).then((res) => {
        data.push(res);
        res.data.forEach((r) => {
          if (r.review_comments_url) {
            axios.get(r.review_comments_url).then((comments_response) => {
              r.reviewer_comments = comments_response;
            });
          }
        });
      })
    );
  });

  Promise.all(promises).then(() =>
    dispatch({
      type: GET_PROJECTS,
      payload: data,
    })
  );
};

export const addProjects = (newProj, projects) => (dispatch) => {
  if (!projects.includes(newProj)) {
    dispatch({
      type: ADD_PROJECT,
      payload: newProj,
    });
  }
};

export const getDates = (dates) => (dispatch) => {
  dispatch({
    type: GET_DATES,
    payload: dates,
  });
};

export const updateIndex = (i) => (dispatch) => {
  dispatch({
    type: UPDATE_INDEX,
    payload: i,
  });
};
