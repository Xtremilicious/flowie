import { GET_USER, GET_PROJECTS, ADD_PROJECT } from "../types";

const initialState = {
  user: null,
  projects: ["MLH-Fellowship/react-jsonschema-form"],
  projectsData: [],
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
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    default:
      return state;
  }
}
