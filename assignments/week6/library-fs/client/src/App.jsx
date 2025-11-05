import Login from './pages/Login';
import './App.css';
import { AppContextProvider } from './context/AppContext';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AppContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
}

export default App;
