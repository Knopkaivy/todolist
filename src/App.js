import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './FirebaseConfig';
import FirebaseFirestoreService from './FirebaseFirestoreService';
import { v4 as uuidv4 } from 'uuid';
import { starterTodos } from './starter';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import TodoList from './components/TodoList';

import BgImage from './imgs/bg-lg.jpg';
import './styles/App.css';

function App() {
  const [user] = useAuthState(firestore.auth);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      handleFetchTodos();
    } else {
      setTodos(starterTodos);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 1);
  });

  const fetchTodos = async (cursorId = '') => {
    const queries = [];
    const orderByField = 'publishDate';
    let fetchedTodos = [];
    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: `users/${user.uid}/todos`,
        queries: queries,
        orderByField: orderByField,
        orderByDirection: 'asc',
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
      publishDate: new Date(),
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
      <Nav user={user} />
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
