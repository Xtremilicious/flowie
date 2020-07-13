import React from "react";
import styled from "styled-components";

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
  }
  .sub-title {
    font-size: 4vh;
    margin-bottom: 1vh;
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
  .btn-username {
    background-image: linear-gradient(to right, rgb(74, 175, 255), rgb(20, 135, 226));
    border: none;
    color: white;
    padding: 0.7vh 4vh;
    font-size: 3.5vh;
    margin-top: 2vh;
    border-radius: 4vh;
    outline: none;
  }
  .art-pic {
    height: 85vh;
  }
`;

export default function Content() {
  return (
    <ContentContainer>
      <div className="main-container">
        <div className="sub-container-1">
          <div className="sub-title">
            For a <span className="text-underline">better workflow</span>
          </div>
          <div className="title">The Ultimate Progress Tracker for MLH Fellows</div>
          <div className="">
            <button className="btn-username">Try Now!</button>
          </div>
        </div>
        <div className="art">
          <img src="/assets/art.jpg" className="art-pic" alt="flowie-workflow" />
        </div>
      </div>
    </ContentContainer>
  );
}
