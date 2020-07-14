import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../UserContext";
import { FaPlus } from "react-icons/fa";

const TimeLineContainer = styled.div`
  .navbar {
    display: flex;
    padding: 4vh;
  }
  .repo-btn {
    background: white;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgba(0, 0, 0, 0.04) !important;
    border-image: initial !important;
    font-size: 4vh;
    color: #585858;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .btn-container {
    margin: 0 auto;
    display: flex;
  }
  .add-btn {
    border: none;
    outline: none;
    background: none;
    font-size: 4vh;
    margin-left: 1.5vh;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #585858;
  }
  .cur-user {
  }
  .profile-pic {
    height: 7vh;
    border-radius: 50%;
  }
`;

export const HorTimeline = ({ user, userData }) => {
  return (
    <TimeLineContainer>
      <div className="navbar">
        <div className="btn-container">
          <button className="repo-btn">Repository</button>
          <button className="add-btn">
            <FaPlus />
          </button>
        </div>

        <div className="cur-user">
          <img src={userData.data.avatar_url} alt="profile-pic" className="profile-pic" />
        </div>
      </div>
    </TimeLineContainer>
  );
};

export default HorTimeline;
