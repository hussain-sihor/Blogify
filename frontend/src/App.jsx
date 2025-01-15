import React from 'react'
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import AddBlog from './pages/AddBlog';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/addblog' element={<AddBlog/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App

