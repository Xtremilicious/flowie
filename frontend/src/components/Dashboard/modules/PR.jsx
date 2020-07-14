import React, { Component } from "react";
import styled from "styled-components";
import { GoGitPullRequest } from "react-icons/go";
import { FaExternalLinkAlt } from "react-icons/fa";

const PRContainer = styled.div`
  .pr-container {
    display: flex;
    flex-direction: row;
    margin: 3vh;
    padding: 2.5vh;
    border-radius: 2vh;
  }
  .link {
    text-decoration: none;
    color: #0b610b !important;
  }
  .pr-info {
    width: 100%;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vh;
    font-size: 4vh;
  }
  .status-open {
    background: #a9f5a9;
    border: 1px solid #74df00;
  }
  .title {
    color: #21610b;
    font-size: 3.5vh;
  }
  .links {
    display: flex;
    align-items: center;
  }
  .contributors {
    margin-left: auto;
  }
  .contributor-pic {
    height: 6vh;
    border-radius: 50%;
    border: 1px solid #74df00;
  }
`;

export default class PR extends Component {
  render() {
    console.log(this.props.value);
    const { value } = this.props;
    return (
      <PRContainer>
        <div className={value.state === "open" ? "pr-container status-open" : "pr-container"}>
          <div className="icon">
            <GoGitPullRequest />
          </div>
          <div className="pr-info">
            <div className="title">
              {value.state == "open" ? "Open: " : null}
              {value.title}
            </div>
            <div className="dates">
              <div className="opened">{`Created at: ${value.created_at}`}</div>
            </div>
            <div className="links">
              <div className="link-to-pr">
                <a href={value.html_url} className="link" target="_blank">
                  <FaExternalLinkAlt className="link" />
                </a>
              </div>
              <div className="contributors">
                <a href={value.user.html_url} target="_blank" className="link">
                  <img src={value.user.avatar_url} className="contributor-pic" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </PRContainer>
    );
  }
}
