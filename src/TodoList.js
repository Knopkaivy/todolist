import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import Form from './Form';
import './styles/TodoList.css';

const TodoList = ({ handleAddTodo, todos }) => {
  const [list, setList] = useState(todos);

  const addItem = (newVal) => {
    let additionalItem = {
      id: uuidv4(),
      text: newVal,
      completed: false,
      editMode: false,
    };
    setList([...list, additionalItem]);
    handleAddTodo(additionalItem);
  };

  const completeItem = (id) => {
    const updatedList = list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.completed = newItem.completed ? false : true;
        return newItem;
      }
    });
    setList([...updatedList]);
  };

  const deleteItem = (id) => {
    const updatedList = list.filter((item) => {
      return item.id !== id;
    });
    setList([...updatedList]);
  };

  const editModeOn = (id) => {
    const updatedList = list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.editMode = true;
        return newItem;
      }
    });
    setList([...updatedList]);
  };

  const editItem = (newVal, id) => {
    const newList = list.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.text = newVal;
        newItem.editMode = false;
        newItem.completed = false;
        return newItem;
      }
    });
    setList([...newList]);
  };
  const itemList = list.map((item) => (
    <li key={item.id}>
      {item.editMode ? (
        <Form
          buttonValue="Save"
          deleteItem={deleteItem}
          editItem={editItem}
          id={item.id}
          itemValue={item.text}
        />
      ) : (
        <Todo
          completed={item.completed}
          completeItem={completeItem}
          deleteItem={deleteItem}
          editModeOn={editModeOn}
          id={item.id}
          text={item.text}
        />
      )}
    </li>
  ));
  return (
    <section className="TodoList">
      <h1>Todo List</h1>
      <ul>{itemList}</ul>
      <Form addItem={addItem} placeholder="Do New Things" buttonValue="Add" />
    </section>
  );
};

export default TodoList;
