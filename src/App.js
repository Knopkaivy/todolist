import logo from './logo.svg';
import BgImage from './imgs/bg-lg.jpg';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <div className="bg__container">
        <img src={BgImage} alt="decorative background" className="bg__image" />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
