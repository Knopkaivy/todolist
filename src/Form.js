import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './FirebaseConfig';
import './styles/Form.css';

const Form = ({
  addItem,
  buttonValue,
  deleteItem,
  editItem,
  id,
  itemValue,
  placeholder,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (itemValue) {
      setValue(itemValue);
    }
  }, [itemValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
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
        addItem(value);
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
