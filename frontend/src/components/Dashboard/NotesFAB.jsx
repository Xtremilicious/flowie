import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import {
  getNote,
  addNote
} from "../../redux/actions/dataActions";

const FabContainer = styled.div`
  .fab {
    display: block;
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    width: 75px;
    height:75px;
    background: #DD2317;
    border-radius: 50%;
    outline: none;
    border: none;
    color: white;
    font-size: 2rem;
    transition: all 0.2s ease-out;
  }
  .fab:hover {
      box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.25);
  }
`;

export class NotesFAB extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.props.getNote(this.props.notes);
  }

  render() {
    return (
        <div>
            <FabContainer>
              <button className="fab" data-toggle="modal" data-target="#notesModal">+</button>
            </FabContainer>
            <div 
                class="modal fade" 
                id="notesModal" 
                tabindex="-1" 
                role="dialog" 
                aria-labelledby="notesModalLabel" 
                aria-hidden="true"
            >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="notesModalLabel">Notes for the day</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <strong>Yesterday</strong>
                  <ul>
                      <li>Learnt React</li>
                      <li>Bootstrap too</li>
                  </ul>
                <strong>Today</strong>
                  <ul>
                      <li>Create Modal</li>
                  </ul>
                  <strong>Blockers</strong>
                  <ul>
                      <li>Everything is cake</li>
                  </ul>
                  <strong>Shoutouts</strong>
                  <ul>
                      <li>Nilarjun for helping out with React and Redux :')</li>
                  </ul>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger">Delete note</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
    notes: state.data.notes
  };
};

const mapDispatchToProps = {
  getNote,
  addNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesFAB);
