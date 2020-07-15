import {
  GET_USER,
  GET_PROJECTS,
  ADD_PROJECT,
  GET_DATES,
  UPDATE_INDEX,
  GET_COMMITS,
} from "../types";

const initialState = {
  user: null,
  projects: ["MLH-Fellowship/react-jsonschema-form"],
  projectsData: [],
  dates: [],
  commits: [],
  index: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projectsData: action.payload,
      };
    case GET_COMMITS:
      return {
        ...state,
        commits: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case GET_DATES:
      return {
        ...state,
        dates: action.payload,
      };
    case UPDATE_INDEX:
      return {
        ...state,
        index: action.payload,
      };

    default:
      return state;
  }
}
