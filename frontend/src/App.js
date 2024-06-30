import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowBooks from './components/ShowBooks';
import CreateBooks from './components/CreateBooks';
import DeleteBooks from './components/DeleteBooks';
import EditBooks from './components/EditBooks';
import Home from './components/Home';
import Login from './components/authcomponent/Login.js';
import Signup from './components/authcomponent/Signup.js';
import PrivateRoute from './components/authcomponent/PrivateRoute.js';


function App() {
  return (
    <Routes>
      <Route  path='/'exact element={<Login />} />
      <Route  path='/register' element={<Signup />} />
      
      {/* PRIVATE */}
      <Route element={<PrivateRoute />}>
      <Route  path='/home' element={<Home />} />
      <Route  path='/books/create' element={<CreateBooks />} />
      <Route  path='/books/details/:id' element={<ShowBooks />} />
      <Route  path='/books/edit/:id' element={<EditBooks />} />
      <Route  path='/books/delete/:id' element={<DeleteBooks />} />

      </Route>

    </Routes>
  );
}

export default App;
