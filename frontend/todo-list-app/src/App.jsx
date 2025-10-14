import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<ErrorBoundary><TodoList/></ErrorBoundary>}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
