import React, { Component } from "react";
import styled from "styled-components";
import { GoGitPullRequest, GoLinkExternal } from "react-icons/go";

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
    color: #0b610b !important;
    font-size: 3vh;
  }
  .pr-info {
    width: 100%;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vh;
    font-size: 4vh;
  }
  .status-open {
    color: #21610b;
  }
  .title {
    color: #21610b;
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
    border: 1px solid #74df00;
  }
`;

export default class PR extends Component {
  render() {
    console.log(this.props.value);
    const { value } = this.props;
    return (
      <PRContainer>
        <div className="pr-container">
          <div className={value.state === "open" ? "icon status-open" : "icon"}>
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
                  <GoLinkExternal className="link" />
                </a>
              </div>

              <div className="contributors">
                {value.labels.length > 0 ? (
                  <div className="badges">
                    {value.labels.map((label) => {
                      const textColor = label.default ? "black" : "white";
                      return (
                        <div
                          className="badge"
                          style={{ backgroundColor: `#${label.color}`, color: textColor }}
                        >
                          {label.name}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
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
