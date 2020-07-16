import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import { getNote, addNote } from "../../redux/actions/dataActions";

const FabContainer = styled.div`
  .fab {
    display: block;
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    width: 75px;
    height: 75px;
    background: #dd2317;
    border-radius: 50%;
    outline: none;
    border: none;
    color: white;
    font-size: 2rem;
    transition: all 0.2s ease-out;
  }
  .fab:hover {
    box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.25);
  }
`;

export class NotesFAB extends Component {
  state = {
    title: window.localStorage.getItem("title") || "",
    description: window.localStorage.getItem("description") || "",
  };

  componentDidMount() {}

  render() {
    const handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
      console.log(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      window.localStorage.setItem("title", this.state.title);
      window.localStorage.setItem("description", this.state.description);
    };

    return (
      <div>
        <FabContainer>
          <button className="fab" data-toggle="modal" data-target="#notesModal">
            +
          </button>
        </FabContainer>
        <div
          class="modal fade"
          id="notesModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="notesModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="notesModalLabel">
                  Notes for the day
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <textarea
                      class="form-control"
                      id="title"
                      name="title"
                      rows="3"
                      style={{ height: "8vh", marginBottom: "3vh" }}
                      value={this.state.title}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea
                      class="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      style={{ height: "30vh" }}
                      value={this.state.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" onClick={handleSubmit}>
                  Save Note
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.data.notes,
  };
};

const mapDispatchToProps = {
  getNote,
  addNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesFAB);
