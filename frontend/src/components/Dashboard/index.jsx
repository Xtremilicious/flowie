import React, { useState } from "react";
import axios from "axios";

export default function Dashboard({ match, location }) {
  const [userData, setuserData] = useState(null);

  axios.get(`https://api.github.com/users/${match.params.userId}`).then(function (response) {
    setuserData(response);
  });

  console.log(match, location);
  return (
    <>
      <code>{JSON.stringify(userData, null, 2)}</code>
    </>
  );
}
