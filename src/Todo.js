import React from 'react';
import './styles/Todo.css';

const Todo = ({
  completed,
  completeItem,
  deleteItem,
  editModeOn,
  id,
  text,
}) => {
  const handleCompleteItem = (event) => {
    completeItem(id);
  };
  const handleDeleteItem = (event) => {
    event.stopPropagation();
    deleteItem(id);
  };
  const handleEditModeOn = (event) => {
    event.stopPropagation();
    editModeOn(id);
  };
  return (
    <div
      onClick={handleCompleteItem}
      className={`Todo ${completed ? 'Todo-completed' : ''}`}
    >
      {text}
      <span onClick={handleDeleteItem}>
        <i className="fas fa-trash"></i>
      </span>
      <span onClick={handleEditModeOn}>
        <i className="fas fa-pen"></i>
      </span>
    </div>
  );
};

export default Todo;
