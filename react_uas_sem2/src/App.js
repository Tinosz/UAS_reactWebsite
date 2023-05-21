import { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Home from './pages/Home';
import { MouseContext } from './components/Cursor/mouse-context';
import CustomCursor from './components/Cursor/CustomCursor';

function App() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  return (
    <div className="App">
      <a><CustomCursor /></a>
      <div className="container">
        
      </div>
      <div className="container" style={{ background: "peachpuff" }}></div>
      <Home />
    </div>
  );
}

export default App;