import React from 'react'
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import AddBlog from './pages/AddBlog';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/addblog' element={<PrivateRoute> <AddBlog/> </PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute> <Profile/> </PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App

