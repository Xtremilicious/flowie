import React, { useEffect, useContext } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";

import HorTimeline from "./HorTimeline";
import TimelineInfo from "./TimelineInfo";

function Dashboard({ match, user, getUserData }) {
  useEffect(() => {
    getUserData(match.params.userId);
  }, []);

  return (
    <>
      {user ? (
        <>
          <HorTimeline user={match.params.userId} userData={user} />
          <TimelineInfo />
        </>
      ) : null}
      ;
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user,
  };
};

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
