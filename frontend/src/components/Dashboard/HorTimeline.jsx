import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import HorizontalTimeline from "../../utils/Components/HorizontalTimeline";
import { connect } from "react-redux";
import {
  getProjects,
  addProjects,
  getDates,
  updateIndex,
  getCommits,
} from "../../redux/actions/dataActions";

const TimeLineContainer = styled.div`
  .navbar {
    display: flex;
    padding: 4vh;
  }
  .link {
    text-decoration: none;
    color: black;
  }
  .repo-btn {
    background: transparent;
    border: none;
    border-right: 1px solid #bdbdbd;
    font-size: 3.2vh;
    color: #585858;
    outline: none;
    display: flex;
    align-items: center;
    padding: 0.2vh 2vh;
    cursor: pointer;
  }
  .btn-container {
    margin: 0 auto;
    display: flex;
    border-radius: 2vh;
    border: 1px solid #bdbdbd;
  }
  .input-box {
    border: none;
    padding: calc(0.7vh - 0.3px) 4vh calc(0.7vh - 0.3px) 2vh;
    font-size: 3vh;
    background: #fafafa;
    border: 0.3px solid #d8d8d8;
    outline: none;
    width: 100%;
  }
  .btn-username {
    background-image: linear-gradient(to right, rgb(74, 175, 255), rgb(20, 135, 226));
    border: none;
    color: white;
    padding: calc(0.7vh - 0.3px) 4vh calc(0.7vh - 0.3px) 2vh;
    font-size: 3vh;
    outline: none;
    display: flex;
    border: 0.3px solid rgb(20, 135, 226);
    align-items: center;
    cursor: pointer;
    z-index: 1;
    height: 100%;
  }
  .add-btn {
    border: none;
    outline: none;
    background: none;
    font-size: 3vh;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #585858;
  }
  .cur-user {
  }
  .profile-pic {
    height: 7vh;
    border-radius: 50%;
  }

  .projects-added {
    margin-left: 30%;
    margin-right: 30%;
  }
  .timeline {
  }
`;

export class HorTimeline extends Component {
  state = {
    index: 0,
    previous: 0,
    newProject: "facebook/react",
  };

  componentDidMount() {
    this.props.getProjects(this.props.projects);
    this.props.getCommits(this.props.projects);
  }

  render() {
    const handleChange = (event) => {
      this.setState({
        newProject: event.target.value,
      });
      console.log(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      this.props.addProjects(this.state.newProject, this.props.projects);
      this.props.getProjects(this.props.projects);
      this.props.getCommits(this.props.projects);
    };

    const { projects, projectsData, user, commits } = this.props;

    let dates = [];
    projectsData.forEach((project) => {
      project.data.forEach((subdata) => {
        const date = new Date(subdata.updated_at).toDateString();
        if (!dates.includes(date)) {
          dates.push(date);
        }
      });
    });

    commits.forEach((commit) => {
      commit.data.forEach((subdata) => {
        const date = new Date(subdata.commit.author.date).toDateString();
        if (!dates.includes(date)) {
          dates.push(date);
        }
      });
    });

    dates.sort(function (date1, date2) {
      if (new Date(date1) > new Date(date2)) return 1;
      if (new Date(date1) < new Date(date2)) return -1;
      return 0;
    });
    console.log(projectsData);

    return (
      <TimeLineContainer>
        <div className="navbar">
          <div>
            <a className="navbar-brand mx-sm-4 mr-sm-5" href="../" className="link">
              <span className="brand-title">Flowie</span>
            </a>
          </div>
          <div className="btn-container">
            <button className="repo-btn" data-toggle="collapse" href="#collapseExample">
              Tracked Projects
            </button>
            <button className="add-btn" data-toggle="modal" data-target="#exampleModal">
              <FaPlus />
            </button>
          </div>

          <div className="cur-user">
            <img src={user.data.avatar_url} alt="profile-pic" className="profile-pic" />
          </div>
        </div>
        <div className="collapse projects-added" id="collapseExample">
          <ul className="list-group">
            {projectsData.length > 0
              ? projects.map((project) => {
                  return (
                    <li className="list-group-item d-flex">
                      {project}
                      <span className="text-danger" style={{ marginLeft: "auto" }}>
                        <FaTimes />
                      </span>
                    </li>
                  );
                })
              : "no data"}
          </ul>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ overflow: "hidden" }}>
              <div className="modal-header" style={{ position: "relative" }}>
                <h5 className="modal-title w-100" id="exampleModalLabel">
                  Add New Project
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="input-box mr-auto mt-3"
                      placeholder="facebook/react"
                      value={this.state.newProject}
                      onChange={handleChange}
                    />
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-primary ml-auto" type="submit">
                        Add Project
                      </button>
                    </div>
                  </form>
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TimeLineContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user,
    projects: state.data.projects,
    projectsData: state.data.projectsData,
    dates: state.data.dates,
    commits: state.data.commits,
  };
};

const mapDispatchToProps = {
  getProjects,
  addProjects,
  getDates,
  updateIndex,
  getCommits,
};

export default connect(mapStateToProps, mapDispatchToProps)(HorTimeline);
