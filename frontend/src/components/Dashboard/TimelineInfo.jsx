import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HorizontalTimeline from "../../utils/Components/HorizontalTimeline";

import {
  getProjects,
  addProjects,
  getDates,
  updateIndex,
  getCommits,
} from "../../redux/actions/dataActions";

import PR from "./modules/PR";
import Issue from "./modules/Issue";
import Commit from "./modules/Commit";

const TimelineInfoContainer = styled.div`
  .PR-Container {
    margin-left: 20%;
    margin-right: 20%;
  }
  .filter {
    display: flex;
    width: fit-content;
    margin: 3vh;
    padding: 1vh;
  }
  .badge {
    border-radius: 2vh;
    border: 1px solid #bdbdbd;
    padding: 1vh 2vh;
    cursor: pointer;
  }
  .selected {
    background: #ededed;
  }
`;

class TimelineInfo extends Component {
  state = {
    isExclusive: false,
    projectsData: [],
    commits: [],
    index: 0,
    previous: 0,
    dates: [],
    oldData: {},
  };

  updateStateData(bool, projectsData, commits) {
    let tempData = [...projectsData];
    let tempData2 = [...commits];
    if (bool) {
      tempData.forEach((project) => {
        project.data = project.data.filter(
          (subdata) => subdata.user.login == this.props.user.data.login
        );
      });

      tempData2.forEach((commit) => {
        commit.data = commit.data.filter(
          (subdata) => subdata.author.login == this.props.user.data.login
        );
      });
      this.setState(
        {
          projectsData: tempData,
          commits: tempData2,
        },
        () => {
          this.updateDates();
        }
      );
    } else {
      this.setState(
        {
          projectsData: projectsData,
          commits: commits,
        },
        () => {
          this.updateDates();
        }
      );
    }
  }

  updateDates() {
    let dates = [];
    this.state.projectsData.forEach((project) => {
      project.data.forEach((subdata) => {
        const date = new Date(subdata.updated_at).toDateString();
        if (!dates.includes(date)) {
          dates.push(date);
        }
      });
    });

    this.state.commits.forEach((commit) => {
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

    this.setState({
      dates: dates,
    });
  }

  componentDidMount() {
    this.updateStateData(false, this.props.projectsData, this.props.commits);
    this.props.getProjects(this.props.projects);
    this.props.getCommits(this.props.projects);
    console.log("haha", this.props.projectsData);
  }

  render() {
    const handleInputChange = (event) => {
      const target = event.target;
      const value = target.name === "isExclusive" ? target.checked : target.value;
      const name = target.name;

      console.log(value);

      this.setState(
        {
          [name]: value,
          index: 0,
        },
        () => {
          this.updateStateData(value, this.props.projectsData, this.props.commits);
        }
      );
      this.props.getProjects(this.props.projects);
      this.props.getCommits(this.props.projects);
    };

    const { location, history } = this.props;
    const { index, loc, user } = this.props;

    const handleFilter = (filter) => {
      if (filter === "") {
        history.push(`./${user.data.login}`);
      } else {
        history.push(`./${user.data.login}?show=${filter}`);
      }
    };
    return (
      <TimelineInfoContainer>
        <div>
          <div style={{ width: "60%", height: "150px", margin: "0 auto", marginTop: "5vh" }}>
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
              values={this.state.dates}
              style={{ margin: "0px 40px" }}
            />
          </div>
        </div>
        <div className="PR-Container">
          <div className="filter d-flex align-items-center">
            <div className="mr-2">Filters: </div>
            <div
              onClick={() => handleFilter("")}
              className={loc.slice(loc.length - 2) == "" ? "mr-2 badge selected" : "mr-2 badge"}
            >
              All
            </div>
            <div
              onClick={() => handleFilter("PR")}
              className={loc.slice(loc.length - 2) == "PR" ? "mr-2 badge selected" : "mr-2 badge"}
            >
              Pull Requests
            </div>
            <div
              onClick={() => handleFilter("IS")}
              className={loc.slice(loc.length - 2) == "IS" ? "mr-2 badge selected" : "mr-2 badge"}
            >
              Issues
            </div>
            <div
              onClick={() => handleFilter("CM")}
              className={loc.slice(loc.length - 2) == "CM" ? "mr-2 badge selected" : "mr-2 badge"}
            >
              Commits
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="isExclusive"
                value=""
                id="defaultCheck1"
                checked={this.state.isExclusive}
                onChange={handleInputChange}
              />
              <label class="form-check-label" for="defaultCheck1">
                Your Contributions
              </label>
            </div>
          </div>
          {this.state.projectsData.length > 0
            ? this.state.projectsData.map((project) => {
                return (
                  <>
                    {project.data.map((subdata) => {
                      if (loc == "") {
                        if (subdata.pull_request) {
                          if (
                            new Date(subdata.updated_at).toDateString() == this.state.dates[index]
                          ) {
                            return <PR value={subdata} />;
                          }
                        } else {
                          if (
                            new Date(subdata.updated_at).toDateString() == this.state.dates[index]
                          ) {
                            return <Issue value={subdata} />;
                          }
                        }
                      } else {
                        const type = loc.slice(loc.length - 2);
                        if (type == "PR" && subdata.pull_request) {
                          if (
                            new Date(subdata.updated_at).toDateString() == this.state.dates[index]
                          ) {
                            return <PR value={subdata} />;
                          }
                        } else if (type == "IS" && !subdata.pull_request) {
                          if (
                            new Date(subdata.updated_at).toDateString() == this.state.dates[index]
                          ) {
                            return <Issue value={subdata} />;
                          }
                        }
                      }
                    })}
                  </>
                );
              })
            : "no data"}
          {this.state.commits.length > 0
            ? this.state.commits.map((commit) => {
                return (
                  <>
                    {commit.data.map((subdata) => {
                      if (loc.slice(loc.length - 2) == "CM" || loc == "") {
                        if (
                          new Date(subdata.commit.author.date).toDateString() ==
                          this.state.dates[index]
                        ) {
                          return <Commit value={subdata} />;
                        }
                      }
                    })}
                  </>
                );
              })
            : "no data"}
        </div>
      </TimelineInfoContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user,
    projects: state.data.projects,
    index: state.data.index,
    projectsData: state.data.projectsData,
    commits: state.data.commits,
  };
};

const mapDispatchToProps = { getProjects, addProjects, getDates, updateIndex, getCommits };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimelineInfo));
