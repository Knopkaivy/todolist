import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from './FirebaseConfig';
import './styles/Form.css';

const Form = ({
  buttonValue,
  deleteItem,
  editItem,
  handleAddTodo,
  id,
  itemValue,
  placeholder,
}) => {
  const [value, setValue] = useState('');
  const [user] = useAuthState(firebase.auth);

  useEffect(() => {
    if (itemValue) {
      setValue(itemValue);
    }
  }, [itemValue]);

  const handleChange = (event) => {
    if (!user) {
      alert('Please login to add new todo');
      return;
    } else {
      setValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      if (value === '') {
        deleteItem(id);
      } else {
        editItem(value, id);
      }
    } else {
      if (value !== '') {
        handleAddTodo(value);
        setValue('');
      } else return;
    }
  };
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        id="formInput"
        onChange={handleChange}
        type="text"
        placeholder={placeholder ? placeholder : null}
        value={value}
        className="inpt"
      />
      <button className="btn btn-green">{buttonValue}</button>
    </form>
  );
};

export default Form;
