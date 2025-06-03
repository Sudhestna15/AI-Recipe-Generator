import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home.jsx';
import Recipes from './pages/Recipes.jsx';
import Contact from './pages/Contact.jsx';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>}>
    <Route index  element={<Home/>}/>
    <Route path="recipes" element={<Recipes/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path="contact" element={<Contact/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
