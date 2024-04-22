import React from 'react';
import './App.css'
import Tasks from './components/Tasks';
import Classes from './components/Classes';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return(
    <div>
      <BrowserRouter>

      <Routes>
      <Route exact path = '/tasks' element = {<Tasks/>}/>
      <Route exact path = '/classes' element = {<Classes/>}/>
      <Route exact path = '/login' element = {<Login/>}/>
      <Route exact path = '/signup' element = {<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
