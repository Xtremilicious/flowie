import React, { useEffect, useContext } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";

import HorTimeline from "./HorTimeline";
import TimelineInfo from "./TimelineInfo";
import NotesFAB from "./NotesFAB";

function Dashboard({ match, user, getUserData, location, projectsData, commits }) {
  useEffect(() => {
    getUserData(match.params.userId);
  }, []);
  console.log("hi", location.search);
  return (
    <>
      {user ? (
        <>
          <HorTimeline user={match.params.userId} userData={user} />
          {projectsData.length > 0 && commits.length > 0 ? (
            <TimelineInfo loc={location.search} />
          ) : (
            "loading data"
          )}
  
          <NotesFAB/>

        </>
      ) : null}
      ;
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user,
    projects: state.data.projects,
    projectsData: state.data.projectsData,
    index: state.data.index,
    commits: state.data.commits,
  };
};

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
