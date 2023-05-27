import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import BookshelfPage from "./pages/BooshelfPage";

function App() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MyBookshelf" element={<BookshelfPage />} />
          <Route path="/Test" element={<TestPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
