import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import Form from './Form';
import './styles/TodoList.css';

const TodoList = ({
  handleAddTodo,
  completeItem,
  deleteItem,
  editModeOn,
  editItem,
  todos,
}) => {
  // const [list, setList] = useState(todos);

  // const addItem = (newVal) => {
  //   let additionalItem = {
  //     id: uuidv4(),
  //     text: newVal,
  //     completed: false,
  //     editMode: false,
  //   };
  //   setTodos([...list, additionalItem]);
  //   handleAddTodo(additionalItem);
  // };

  // const completeItem = (id) => {
  //   const updatedList = todos.filter((item) => {
  //     if (item.id !== id) return item;
  //     else {
  //       let newItem = item;
  //       newItem.completed = newItem.completed ? false : true;
  //       return newItem;
  //     }
  //   });
  //   setTodos([...updatedList]);
  // };

  // const deleteItem = (id) => {
  //   const updatedList = todos.filter((item) => {
  //     return item.id !== id;
  //   });
  //   setTodos([...updatedList]);
  // };

  // const editModeOn = (id) => {
  //   const updatedList = todos.filter((item) => {
  //     if (item.id !== id) return item;
  //     else {
  //       let newItem = item;
  //       newItem.editMode = true;
  //       return newItem;
  //     }
  //   });
  //   setTodos([...updatedList]);
  // };

  // const editItem = (newVal, id) => {
  //   const newList = todos.filter((item) => {
  //     if (item.id !== id) return item;
  //     else {
  //       let newItem = item;
  //       newItem.text = newVal;
  //       newItem.editMode = false;
  //       newItem.completed = false;
  //       return newItem;
  //     }
  //   });
  //   setTodos([...newList]);
  // };
  let itemList;
  if (todos && todos.length > 0) {
    itemList = todos.map((item) => {
      return (
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
      );
    });
  }

  return (
    <section className="TodoList">
      <h1>Todo List</h1>
      <ul>{itemList}</ul>
      <Form
        handleAddTodo={handleAddTodo}
        placeholder="Do New Things"
        buttonValue="Add"
      />
    </section>
  );
};

export default TodoList;
