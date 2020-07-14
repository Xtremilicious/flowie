import React, { useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import axios from "axios";

import HorTimeline from "./HorTimeline";

export default function Dashboard({ match }) {
  const context = useContext(UserContext);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${match.params.userId}`).then(function (response) {
      context.setUser(response);
    });
  }, [context, match.params.userId]);

  return (
    <>{context.user ? <HorTimeline user={match.params.userId} userData={context.user} /> : null};</>
  );
}
