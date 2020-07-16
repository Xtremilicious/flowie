import {
  GET_USER,
  GET_PROJECTS,
  ADD_PROJECT,
  GET_DATES,
  UPDATE_INDEX,
  GET_COMMITS,
  GET_NOTES,
  SET_NOTES,
  DELETE_PROJECT,
} from "../types";
import axios from "axios";

const config = {
  headers: { Authorization: "Token 57e7bb071317637b6d6385679a086faf18c94cd7" },
};

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
      axios.get(`https://api.github.com/repos/${project}/issues?state=all`).then((res) => {
        data.push(res);
        res.data.forEach((r) => {
          if (r.comments_url) {
            axios.get(r.comments_url).then((comments_response) => {
              r.reviewer_comments = comments_response;
            });
          }
          if (r.body !== "") {
            let pattern = /fix[\s\w\W\r\n]{0,3}?#([0-9]+)|fix[\s\w\W\r\n]{0,20}?github\.com[\s\w\W\r\n]*?issues\/([0-9]+)/gi;
            const str = r.body;
            r.linked_issues = [];
            const matches = [...str.matchAll(pattern)];
            if (matches.length !== 0) {
              for (let matchIndex in matches) {
                let match = matches[matchIndex];
                let matched = match[1] === undefined ? match[2] : match[1];
                axios
                  .get(`https://api.github.com/repos/${project}/issues/${matched}`)
                  .then((linked_issue_response) => {
                    console.log(linked_issue_response);
                    r.linked_issues.push(linked_issue_response);
                  });
              }
            }
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

export const getCommits = (projects) => (dispatch) => {
  let data = [];
  let promises = [];
  projects.forEach((project) => {
    promises.push(
      axios.get(`https://api.github.com/repos/${project}/commits`).then((res) => {
        data.push(res);
      })
    );
  });

  Promise.all(promises).then(() =>
    dispatch({
      type: GET_COMMITS,
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

export const deleteProject = (project, projects) => (dispatch) => {
  if (projects.includes(project)) {
    projects = projects.filter((t) => t != project);
  }
  dispatch({
    type: DELETE_PROJECT,
    payload: projects,
  });
};

export const getNote = () => (dispatch) => {
  let notes = window.localStorage.getItem("notes") || "";
  dispatch({
    type: GET_NOTES,
    payload: notes,
  });
};

export const addNote = (note) => (dispatch) => {
  window.localStorage.setItem("notes", note);
  dispatch({
    type: SET_NOTES,
    payload: note,
  });
};
