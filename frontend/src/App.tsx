
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  HomePage  from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import Navbar from './componts/Navbar';
import AuthProvider from './context/Auth/authContextProvider';
import { CartPage } from './pages/cartPage';
import {ProtectedRoute} from "./componts/protectedRoute"

function App() {
return (

<AuthProvider>  
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}>
    <Route path="/cart" element={<CartPage />} />
    </Route>
  </Routes>
  </BrowserRouter>
</AuthProvider>
)

  

}

export default App
