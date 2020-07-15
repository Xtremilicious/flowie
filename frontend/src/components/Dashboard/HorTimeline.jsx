import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import HorizontalTimeline from "react-horizontal-timeline";
import { connect } from "react-redux";
import { getProjects, addProjects, getDates, updateIndex } from "../../redux/actions/dataActions";

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
    background: white;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgba(0, 0, 0, 0.04) !important;
    border-image: initial !important;
    font-size: 4vh;
    color: #585858;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .btn-container {
    margin: 0 auto;
    display: flex;
  }
  .add-btn {
    border: none;
    outline: none;
    background: none;
    font-size: 4vh;
    margin-left: 1.5vh;
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
    newProject: "MLH-Fellowship/react-jsonschema-form",
  };

  componentDidMount() {
    this.props.getProjects(this.props.projects);
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
    };

    const { projects, projectsData, user } = this.props;

    let dates = [];
    projectsData.forEach((project) => {
      project.data.forEach((subdata) => {
        const date = new Date(subdata.updated_at).toDateString();
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
              Projects
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
        <div>
          <div style={{ width: "60%", height: "150px", margin: "0 auto", marginTop: "7vh" }}>
            <HorizontalTimeline
              index={this.state.index}
              indexClick={(value) => {
                this.setState(
                  {
                    previous: this.state.index,
                    index: value,
                  },
                  () => {
                    this.props.updateIndex(value);
                  }
                );
              }}
              values={dates}
              style={{ margin: "0px 40px" }}
            />
          </div>
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
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add a new Project
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="MLH-Fellowship/react-jsonschema-form"
                    value={this.state.newProject}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Add Project
                  </button>
                </div>
              </form>
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
  };
};

const mapDispatchToProps = {
  getProjects,
  addProjects,
  getDates,
  updateIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(HorTimeline);
