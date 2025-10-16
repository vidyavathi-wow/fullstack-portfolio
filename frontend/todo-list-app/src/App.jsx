import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import TodoList from './components/TodoList/TodoList.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

const Main = styled.main`
  padding: 20px;
  maxwidth: 900px;
  margin: 0 auto;
`;

function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Main>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
