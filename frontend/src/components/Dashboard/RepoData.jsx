import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjects, addProjects } from "../../redux/actions/dataActions";

class RepoData extends Component {
  render() {
    return (
      <div>
        {this.props.projectsData.map((project) => {
          return <div>JSON.stringify(project)</div>;
        })}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RepoData);
