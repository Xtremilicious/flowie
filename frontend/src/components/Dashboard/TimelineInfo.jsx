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
    const { projectsData } = this.props;
    return (
      <TimelineInfoContainer>
        {projectsData.length > 0
          ? projectsData.map((project) => {
              return (
                <div className="PR-Container">
                  {project.data.map((subdata) => {
                    return <PR value={subdata} />;
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
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineInfo);
