import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard({ match, location }) {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${match.params.userId}`).then(function (response) {
      setuserData(response);
    });
  }, [match.params.userId]);

  console.log(match, location);
  return (
    <>
      <code>{JSON.stringify(userData, null, 2)}</code>
    </>
  );
}
