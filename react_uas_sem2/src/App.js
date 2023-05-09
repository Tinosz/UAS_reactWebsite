import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const googleBookAPI = () => {
    Axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBxHNlW_9Ykvh8BPNhzXnZMGwiwihobwrg").then((response)=> {
      console.log(response);
    });
  };

  const openLibraryAPI = () => {
    Axios.get("https://openlibrary.org/works/OL45804W.json").then((response)=> {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <button onClick={googleBookAPI}>Get Google Book</button>
          <button onClick={openLibraryAPI}>Get OL Books</button>
      </header>
    </div>
  );
}

export default App;
