
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Footer from './components/footer';
import Banner from './components/banner';

import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Banner />
    </div>
  );
}

export default App;
