import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from './FirebaseConfig';
import './styles/Todo.css';

const Todo = ({
  completed,
  completeItem,
  deleteItem,
  editModeOn,
  id,
  text,
}) => {
  const [user] = useAuthState(firebase.auth);

  const handleCompleteItem = (event) => {
    if (user) {
      completeItem(id);
    }
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
      {user && (
        <>
          <span onClick={handleDeleteItem}>
            <i className="fas fa-trash"></i>
          </span>
          <span onClick={handleEditModeOn}>
            <i className="fas fa-pen"></i>
          </span>
        </>
      )}
    </div>
  );
};

export default Todo;
