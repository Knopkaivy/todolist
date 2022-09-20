import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import FirebaseFirestoreService from './FirebaseFirestoreService';
import { v4 as uuidv4 } from 'uuid';
import { starterTodos } from './starter';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import TodoList from './TodoList';

import BgImage from './imgs/bg-lg.jpg';
import './styles/App.css';

function App() {
  const [user, loading, error] = useAuthState(firestore.auth);
  const [todos, setTodos] = useState(starterTodos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      handleFetchTodos();
    } else {
      setTodos(starterTodos);
    }
    setIsLoading(false);
  }, [user]);

  const fetchTodos = async (cursorId = '') => {
    const queries = [];
    // const orderByField = 'publishDate';
    let fetchedTodos = [];
    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: `users/${user.uid}/todos`,
        queries: queries,
        // orderByField: orderByField,
        cursorId: cursorId,
      });
      const newTodos = response.docs.map((todoDoc) => {
        const data = todoDoc.data();
        // data.publishDate = new Date(data.publishDate.seconds * 1000);
        return { ...data };
      });

      if (cursorId) {
        fetchedTodos = [...todos, ...newTodos];
      } else {
        fetchedTodos = [...newTodos];
      }
      return fetchedTodos;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleFetchTodos = async (cursorId = '') => {
    try {
      const fetchedTodos = await fetchTodos(cursorId);
      console.log('fetchedTodos', fetchedTodos);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleAddTodo = (value) => {
    const subCollectionRef = `users/${user.uid}/todos`;
    let newTodo = {
      id: uuidv4(),
      text: value,
      completed: false,
      editMode: false,
    };
    FirebaseFirestoreService.createDocument(
      subCollectionRef,
      newTodo.id,
      newTodo
    );
    handleFetchTodos();
  };

  const handleUpdateTodo = async (newTodo, todoId) => {
    try {
      await FirebaseFirestoreService.updateDocument(
        `users/${user.uid}/todos`,
        todoId,
        newTodo
      );
      handleFetchTodos();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const completeItem = (id) => {
    const newItem = todos.find((item) => item.id === id);
    newItem.completed = newItem.completed ? false : true;
    handleUpdateTodo(newItem, id);
  };

  const deleteItem = async (id) => {
    try {
      await FirebaseFirestoreService.deleteDocument(
        `users/${user.uid}/todos`,
        id
      );
      handleFetchTodos();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    const updatedList = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos([...updatedList]);
  };

  const editModeOn = (id) => {
    const updatedList = todos.filter((item) => {
      if (item.id !== id) return item;
      else {
        let newItem = item;
        newItem.editMode = true;
        return newItem;
      }
    });
    setTodos([...updatedList]);
  };

  const editItem = (newVal, id) => {
    const newItem = todos.find((item) => item.id === id);
    newItem.text = newVal;
    newItem.editMode = false;
    newItem.completed = false;

    handleUpdateTodo(newItem, id);
  };

  return (
    <div className="App">
      <div className="bg__container">
        <img src={BgImage} alt="decorative background" className="bg__image" />
      </div>
      <nav className="nav">
        <div className="nav__itemContainer">
          {user ? (
            <>
              <div className="nav__item">{user.displayName}</div>
              <button
                type="button"
                onClick={FirebaseAuthService.logoutUser}
                className="btn btn__logout nav__item nav__item-hidden"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="login" className="nav__item NavLink">
              Login
            </NavLink>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <TodoList
                handleAddTodo={handleAddTodo}
                completeItem={completeItem}
                deleteItem={deleteItem}
                editModeOn={editModeOn}
                editItem={editItem}
                isLoading={isLoading}
                todos={todos}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
