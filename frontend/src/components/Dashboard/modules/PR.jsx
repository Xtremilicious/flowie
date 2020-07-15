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
  }
  .badge-text {
    filter: grayscale(1) invert(1);
  }
`;

export default class PR extends Component {
  render() {
    console.log(this.props.value);
    const { value } = this.props;
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

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
                <a
                  href={value.html_url}
                  className="link"
                  target="_blank"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Go to PR"
                >
                  <GoLinkExternal className="link" />
                </a>
              </div>

              <div className="contributors">
                {value.labels.length > 0 ? (
                  <div className="badges">
                    {value.labels.map((label) => {
                      let textColor = hexToRgb(`#${label.color}`);
                      if (textColor.r * 0.299 + textColor.g * 0.587 + textColor.b * 0.114 > 186) {
                        textColor = "#000000";
                      } else {
                        textColor = "#ffffff";
                      }
                      return (
                        <div className="badge" style={{ backgroundColor: `#${label.color}` }}>
                          <span className="" style={{ color: textColor }}>
                            {label.name}
                          </span>
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
