import { GET_USER, GET_PROJECTS, ADD_PROJECT } from "../types";
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

export const addProjects = (newProj) => (dispatch) => {
  dispatch({
    type: ADD_PROJECT,
    payload: newProj,
  });
};
