import React, { useContext, useState, useEffect, Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserConsumer } from "../../UserContext";
import { FaPlus, FaTimes } from "react-icons/fa";
import HorizontalTimeline from "react-horizontal-timeline";
import { connect } from "react-redux";
import { getProjects, addProjects } from "../../redux/actions/dataActions";

const TimeLineContainer = styled.div`
  .navbar {
    display: flex;
    padding: 4vh;
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
      this.props.addProjects(this.state.newProject);
      this.props.getProjects(this.props.projects);
    };

    const { projects, projectsData, user } = this.props;

    return (
      <TimeLineContainer>
        <div className="navbar">
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
        <div class="collapse projects-added" id="collapseExample">
          <ul class="list-group">
            {projectsData.length > 0
              ? projectsData.map((project) => {
                  return (
                    <li class="list-group-item d-flex">
                      {project.data.full_name}
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
                this.setState({
                  previous: this.state.index,
                  index: value,
                });
              }}
              values={[
                "2015-03-25",
                "2015-03-26",
                "07/25/2015",
                "Mar 25 2016",
                "Sep 25 2016",
                "Sep 25 2017",
              ]}
              style={{ margin: "0px 40px" }}
            />
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add a new Project
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div class="modal-body">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="MLH-Fellowship/react-jsonschema-form"
                    value={this.state.newProject}
                    onChange={handleChange}
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button class="btn btn-primary" type="submit">
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
  };
};

const mapDispatchToProps = {
  getProjects,
  addProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(HorTimeline);
