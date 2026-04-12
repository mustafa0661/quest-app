import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Login from './features/auth/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;