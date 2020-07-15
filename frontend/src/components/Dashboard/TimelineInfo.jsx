import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PR from "./modules/PR";
import Issue from "./modules/Issue";

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
  render() {
    const { location, history } = this.props;
    const { projectsData, index, loc, user } = this.props;
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

    const handleFilter = (filter) => {
      if (filter == "") {
        history.push(`./${user.data.login}`);
      } else {
        history.push(`./${user.data.login}?show=${filter}`);
      }
    };
    return (
      <TimelineInfoContainer>
        {projectsData.length > 0
          ? projectsData.map((project) => {
              return (
                <div className="PR-Container">
                  <div className="filter">
                    <div className="mr-2">Filters: </div>
                    <div
                      onClick={() => handleFilter("")}
                      className={
                        loc.slice(loc.length - 2) == "" ? "mr-2 badge selected" : "mr-2 badge"
                      }
                    >
                      All
                    </div>
                    <div
                      onClick={() => handleFilter("PR")}
                      className={
                        loc.slice(loc.length - 2) == "PR" ? "mr-2 badge selected" : "mr-2 badge"
                      }
                    >
                      Pull Requests
                    </div>
                    <div
                      onClick={() => handleFilter("IS")}
                      className={
                        loc.slice(loc.length - 2) == "IS" ? "mr-2 badge selected" : "mr-2 badge"
                      }
                    >
                      Issues
                    </div>
                  </div>
                  {project.data.map((subdata) => {
                    if (loc == "") {
                      if (subdata.pull_request) {
                        if (new Date(subdata.updated_at).toDateString() == dates[index]) {
                          return <PR value={subdata} />;
                        }
                      } else {
                        if (new Date(subdata.updated_at).toDateString() == dates[index]) {
                          return <Issue value={subdata} />;
                        }
                      }
                    } else {
                      const type = loc.slice(loc.length - 2);
                      if (type == "PR" && subdata.pull_request) {
                        if (new Date(subdata.updated_at).toDateString() == dates[index]) {
                          return <PR value={subdata} />;
                        }
                      } else if (type == "IS" && !subdata.pull_request) {
                        if (new Date(subdata.updated_at).toDateString() == dates[index]) {
                          return <Issue value={subdata} />;
                        }
                      }
                    }
                  })}
                </div>
              );
            })
          : "no data"}
      </TimelineInfoContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user,
    projects: state.data.projects,
    projectsData: state.data.projectsData,
    index: state.data.index,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimelineInfo));
