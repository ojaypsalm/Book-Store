import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowBooks from './components/ShowBooks';
import CreateBooks from './components/CreateBooks';
import DeleteBooks from './components/DeleteBooks';
import EditBooks from './components/EditBooks';
import Home from './components/Home';
import Login from './components/authcomponent/Login.js';
import Signup from './components/authcomponent/Signup.js';


function App() {
  return (
    <Routes>
      <Route  path='/' element={<Login />} />
      <Route  path='/home' element={<Home />} />
      <Route  path='/register' element={<Signup />} />
      <Route  path='/books/create' element={<CreateBooks />} />
      <Route  path='/books/details/:id' element={<ShowBooks />} />
      <Route  path='/books/edit/:id' element={<EditBooks />} />
      <Route  path='/books/delete/:id' element={<DeleteBooks />} />
      

    </Routes>
  );
}

export default App;
