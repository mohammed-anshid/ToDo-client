import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Security from './pages/Security';
import ProtectRoute from './Auth/ProtectRoute';
import PublicAuthRote from './Auth/PublicAuthRote';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={ <ProtectRoute><Signup/></ProtectRoute> }/>
          <Route path='/signin' element={ <ProtectRoute><Signin/></ProtectRoute>  }/>
          <Route path='/dashboard' element={ <PublicAuthRote><DashBoard/></PublicAuthRote>  }/>
          <Route path='/profile' element={ <PublicAuthRote><Profile/></PublicAuthRote> }/>
          <Route path='/profile/:id' element={ <PublicAuthRote><EditProfile/></PublicAuthRote> }/>
          <Route path='/security/:id'  element={ <PublicAuthRote><Security/></PublicAuthRote> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
