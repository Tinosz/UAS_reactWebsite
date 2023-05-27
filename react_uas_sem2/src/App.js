import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MouseContext } from './components/Cursor/mouse-context';
import CustomCursor from './components/Cursor/CustomCursor';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import "./App.css"
import NavigationBar from './components/NavigationBar';
import Footer from './components/footer';

function App() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
    <Router>
      <NavigationBar />
      <CustomCursor cursorType={cursorType} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookInfo" element={<TestPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
