
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  HomePage  from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import Navbar from './componts/Navbar';

function App() {
return (

  
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
  </BrowserRouter>
)

  

}

export default App
