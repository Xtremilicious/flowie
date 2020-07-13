import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ContentContainer = styled.div`
  .main-container {
    height: 85vh;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .title {
    font-size: 7vh;
    line-height: 120%;
  }
  .sub-title {
    font-size: 4vh;
    margin-bottom: 4vh;
  }
  .text-underline {
    border-bottom: 0.5vh solid rgb(20, 135, 226);
  }
  .sub-container-1 {
    display: flex;
    width: 85vh;
    justify-content: center;
    flex-direction: column;
  }
  .input-box {
    border-radius: 4vh 0 0 4vh;
    border: none;
    padding: calc(0.7vh - 0.3px) 4vh;
    font-size: 3.5vh;
    background: #fafafa;
    border: 0.3px solid #d8d8d8;
    outline: none;
    width: 15vw;
  }
  .btn-username {
    background-image: linear-gradient(to right, rgb(74, 175, 255), rgb(20, 135, 226));
    border: none;
    color: white;
    padding: 0.7vh 3vh;
    font-size: 3.5vh;
    margin-top: 5vh;
    border-radius: 0 4vh 4vh 0;
    outline: none;
  }
  .art-pic {
    height: 95vh;
    margin-top: -15vh;
  }
`;

export default function Content() {
  const history = useHistory();

  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    history.push(`/user/${username}`);
  };
  return (
    <ContentContainer>
      <div className="main-container">
        <div className="sub-container-1">
          <div className="sub-title">
            For a <span className="text-underline">better workflow</span>
          </div>
          <div className="title">The Ultimate Progress Tracker for MLH Fellows</div>
          <div className="">
            <form onSubmit={() => handleSubmit()}>
              <input
                type="text"
                className="input-box"
                placeholder="@MLHFellow"
                value={username}
                onChange={handleChange}
              />
              <button className="btn-username" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="art">
          <img src="/assets/art.jpg" className="art-pic" alt="flowie-workflow" />
        </div>
      </div>
    </ContentContainer>
  );
}
