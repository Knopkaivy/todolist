import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleCompleteItem = this.handleCompleteItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditModeOn = this.handleEditModeOn.bind(this);
  }
  handleCompleteItem(event) {
    this.props.completeItem(this.props.id);
  }
  handleDeleteItem(event) {
    event.stopPropagation();
    this.props.deleteItem(this.props.id);
  }
  handleEditModeOn(event) {
    event.stopPropagation();
    this.props.editModeOn(this.props.id);
  }
  render() {
    return (
      <div
        onClick={this.handleCompleteItem}
        className={`Todo ${this.props.completed ? 'Todo-completed' : ''}`}
      >
        {this.props.text}
        <span onClick={this.handleDeleteItem}>
          <i className="fas fa-trash"></i>
        </span>
        <span onClick={this.handleEditModeOn}>
          <i className="fas fa-pen"></i>
        </span>
      </div>
    );
  }
}

export default Todo;
