import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import Form from './Form';
import './styles/TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: '1',
          text: 'A ship in harbor is safe,',
          completed: false,
          editMode: false,
        },
        {
          id: '2',
          text: 'but that is not',
          completed: false,
          editMode: false,
        },
        {
          id: '3',
          text: 'what ships are built for.',
          completed: false,
          editMode: false,
        },
      ],
    };
    this.completeItem = this.completeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editModeOn = this.editModeOn.bind(this);
    this.editItem = this.editItem.bind(this);
  }
  addItem(newVal) {
    let additionalItem = {
      id: uuidv4(),
      text: newVal,
      completed: false,
      editMode: false,
    };
    this.setState((prevState) => ({
      list: [...prevState.list, additionalItem],
    }));
  }
  completeItem(id) {
    let newState = this.state.list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.completed = newItem.completed ? false : true;
        return newItem;
      }
    });
    this.setState({ list: [...newState] });
  }
  deleteItem(id) {
    let newState = this.state.list.filter((item) => {
      return item.id !== id;
    });
    this.setState({ list: [...newState] });
  }
  editModeOn(id) {
    let newState = this.state.list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.editMode = true;
        return newItem;
      }
    });
    this.setState({ list: [...newState] });
  }
  editItem(newVal, id) {
    let newState = this.state.list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.text = newVal;
        newItem.editMode = false;
        newItem.completed = false;
        return newItem;
      }
    });
    this.setState({ list: [...newState] });
  }
  render() {
    let list = this.state.list.map((item) => (
      <li key={item.id}>
        {item.editMode ? (
          <Form
            buttonValue="Save"
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            id={item.id}
            itemValue={item.text}
          />
        ) : (
          <Todo
            completed={item.completed}
            completeItem={this.completeItem}
            deleteItem={this.deleteItem}
            editModeOn={this.editModeOn}
            id={item.id}
            text={item.text}
          />
        )}
      </li>
    ));
    return (
      <section className="TodoList">
        <h1>Todo List</h1>
        <ul>{list}</ul>
        <Form
          addItem={this.addItem}
          label="New Todo"
          placeholder="Do New Things"
          buttonValue="Add"
        />
      </section>
    );
  }
}

export default TodoList;
