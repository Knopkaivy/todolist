import React from 'react';
import Todo from './Todo';
import Form from './Form';
import LoadingSpinner from './LoadingSpinner';
import './styles/TodoList.css';

const TodoList = ({
  handleAddTodo,
  completeItem,
  deleteItem,
  editModeOn,
  editItem,
  isLoading,
  todos,
}) => {
  let itemList = [];

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="TodoList__ul">{itemList}</ul>
      )}
      <Form
        handleAddTodo={handleAddTodo}
        placeholder="Do New Things"
        buttonValue="Add"
      />
    </section>
  );
};

export default TodoList;
