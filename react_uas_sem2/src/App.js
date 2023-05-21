import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Home from './pages/Home';
import DotRing from './components/DotRing/DotRing';

function App() {
  return (
    <div className="App">
      <DotRing />
      <div className="container"></div>
      <div className="container" style={{ background: "peachpuff" }}></div>
      <Home />
    </div>
  );
}

export default App;
