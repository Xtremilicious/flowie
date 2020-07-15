import React, { Component } from "react";
import styled from "styled-components";
import { GoGitCommit, GoLinkExternal } from "react-icons/go";

const PRContainer = styled.div`
  .pr-container {
    display: flex;
    flex-direction: row;
    margin: 3vh;
    padding: 2vh;
    border-radius: 2vh;
    border: 1px solid #bdbdbd;
    font-size: 2.5vh;
  }
  .link {
    text-decoration: none;
    color: #2e2e2e;
    font-size: 3vh;
  }
  .pr-info {
    width: 100%;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1vh;
    font-size: 4vh;
  }
  .status-open {
    color: #21610b;
  }
  .status-close {
    color: #cb2431;
  }
  .status-merged {
    color: #5f04b4;
  }
  .title {
    font-size: 3vh;
  }
  .links {
    display: flex;
    align-items: center;
  }
  .badges {
  }
  .badge {
    display: inline-block;
    padding: 0 7px;
    font-size: 11px;
    font-weight: 500;
    line-height: 18px;
    border: 1px solid transparent;
    border-radius: 2em;
    margin: 0.7vh;
  }
  .contributors {
    margin-left: auto;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .contributor-pic {
    height: 6vh;
    margin-left: 2vh;
    border-radius: 50%;
  }
  .badge-text {
    filter: grayscale(1) invert(1);
  }
  .profile-pic {
    height: 5vh;
    border-radius: 50%;
    margin: 0 2vh;
  }
  .comments-container {
    background: ;
  }
  .user-comment {
    display: flex;
    flex-direction: row;
    margin: 2vh;
  }
  .commenter-role {
    display: inline-block;
    padding: 0 7px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    border-radius: 2em;
    border: 1px solid #e1e4e8;
  }
`;

export default class Commit extends Component {
  render() {
    console.log(this.props.value);
    const { value } = this.props;

    const date = new Date(value.commit.author.date);
    const datestring =
      ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    return (
      <PRContainer>
        <div className="accordion" id="accordionExample">
          <div className="pr-container">
            <div className="icon">
              <GoGitCommit />
            </div>
            <div className="pr-info">
              <div className="title">
                {value.commit.message.split(" ").slice(0, 7).join(" ")}
                {"..."}
              </div>
              <div className="dates">
                <div className="opened">{`Timestamp: ${datestring}`}</div>
              </div>
              <div className="links">
                <div className="link-to-pr">
                  <a
                    href={value.html_url}
                    className="link"
                    target="_blank"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Go to Commit"
                  >
                    <GoLinkExternal className="link" />
                  </a>
                </div>

                <div className="contributors">
                  <a href={value.author.html_url} target="_blank" className="link">
                    <img src={value.author.avatar_url} className="contributor-pic" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PRContainer>
    );
  }
}
