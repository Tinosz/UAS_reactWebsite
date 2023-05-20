import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Footer from './components/footer';
import Banner from './components/banner';

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
      <Footer />
      <Banner />
    </div>
  );
}

export default App;
