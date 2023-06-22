import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Security from './pages/Security';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={ <Signup/> }/>
          <Route path='/signin' element={ <Signin/> }/>
          <Route path='/dashboard' element={ <DashBoard/> }/>
          <Route path='/profile' element={ <Profile/> }/>
          <Route path='/profile/:id' element={ <EditProfile/> }/>
          <Route path='/security/:id'  element={ <Security/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
