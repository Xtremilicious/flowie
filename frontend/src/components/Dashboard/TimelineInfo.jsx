import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import PR from "./modules/PR";

const TimelineInfoContainer = styled.div`
  .PR-Container {
    margin-left: 20%;
    margin-right: 20%;
  }
`;

class TimelineInfo extends Component {
  render() {
    const { projectsData, index } = this.props;
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
    return (
      <TimelineInfoContainer>
        {projectsData.length > 0
          ? projectsData.map((project) => {
              return (
                <div className="PR-Container">
                  {project.data.map((subdata) => {
                    if (new Date(subdata.updated_at).toDateString() == dates[index]) {
                      return <PR value={subdata} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(TimelineInfo);
