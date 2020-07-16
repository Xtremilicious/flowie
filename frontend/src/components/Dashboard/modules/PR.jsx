import React, { Component } from "react";
import styled from "styled-components";
import { GoGitPullRequest, GoLinkExternal, GoGitMerge, GoCommentDiscussion, GoIssueOpened } from "react-icons/go";

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
    font-size: 2.7vh;
  }
  .links {
    display: flex;
    align-items: center;
  }
  .badges {
  }
  .badge {
    display: inline-block;
    padding: 0 7px !important;
    font-size: 11px;
    font-weight: 500;
    line-height: 18px;
    border: 1px solid transparent !important;
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

export default class PR extends Component {
  render() {
    const { value } = this.props;
    const { reviewer_comments, linked_issues } = value;
    console.log(linked_issues);
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
    const date = new Date(value.updated_at);
    const datestring =
      ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    function makeid(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const randId = makeid(6);
    const randIdLinkedIssue = makeid(6);
    return (
      <PRContainer>
        <div className="accordion" id="accordionExample">
          <div className="pr-container">
            <div
              className={
                value.state === "open"
                  ? "icon status-open"
                  : value.state === "closed" && value.merged_at != null
                  ? "icon status-merged"
                  : "icon status-close"
              }
            >
              {value.state === "open" ? <GoGitPullRequest /> : <GoGitMerge />}
            </div>
            <div className="pr-info">
              <div
                className={
                  value.state === "open"
                    ? "title status-open"
                    : value.state === "closed" && value.merged_at != null
                    ? "title status-merged"
                    : "title status-close"
                }
              >
                <span style={{ fontWeight: 600 }}>
                  {value.state === "open"
                    ? "Open: "
                    : value.state === "closed" && value.merged_at != null
                    ? "Merged: "
                    : "Closed: "}
                </span>
                {value.title}
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
                    title="Go to PR"
                  >
                    <GoLinkExternal className="link" />
                  </a>
                </div>
                {reviewer_comments && reviewer_comments.data.length > 0 ? (
                  <div className="link-to-pr ml-3">
                    <a
                      href={value.html_url}
                      className="link"
                      target="_blank"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="See Discussion"
                      data-toggle="collapse"
                      data-target={`#${randId}`}
                      aria-expanded="true"
                      aria-controls={`${randId}`}
                    >
                      <GoCommentDiscussion className="link" />
                    </a>
                  </div>
                ) : null}

                {linked_issues && linked_issues.length > 0 ? (
                    <div className="link-to-pr ml-3">
                      <a
                          href={value.html_url}
                          className="link"
                          target="_blank"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="See linked issues"
                          data-toggle="collapse"
                          data-target={`#${randIdLinkedIssue}`}
                          aria-expanded="true"
                          aria-controls={randIdLinkedIssue}
                      >
                        <GoIssueOpened className="link" />
                      </a>
                    </div>
                ) : null}

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
              {linked_issues && linked_issues.length > 0  ? (
                <div
                  id={randIdLinkedIssue}
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="comments-container">
                    {linked_issues.map((linked_issue) => {
                      return (
                        <div className="user-comment">
                          <a href={linked_issue.data.html_url}><GoLinkExternal /></a>
                          <div className="comment-body" style={{"font-size": "14px", "margin-top": "5px", "margin-left": "5px"}}>
                            <div>{linked_issue.data.title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {reviewer_comments && reviewer_comments.data.length > 0 ? (
                  <div
                      id={`${randId}`}
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                  >
                    <div className="comments-container">
                      {reviewer_comments.data.map((comment) => {
                        return (
                            <div className="user-comment">
                              <div className="commenter-avatar">
                                <img
                                    src={comment.user.avatar_url}
                                    alt="profile-pic"
                                    className="profile-pic"
                                />
                              </div>
                              <div className="comment-body">
                                <div
                                    style={{ fontWeight: 500 }}
                                    className="d-flex align-items-center mb-1"
                                >
                                  {comment.user.login}{" "}
                                  {comment.author_association === "MEMBER" ||
                                  comment.author_association === "COLLABORATOR" ? (
                                      <div className="commenter-role ml-2">Member</div>
                                  ) : null}
                                </div>
                                <div>{comment.body}</div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                  </div>
              ) : null}
            </div>
          </div>
        </div>
      </PRContainer>
    );
  }
}
