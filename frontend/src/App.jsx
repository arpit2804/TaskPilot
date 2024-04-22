import React from 'react';
import './App.css'
import Tasks from './components/Tasks';
import Classes from './components/Classes';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';

function App() {
  return(
    <div>
      <BrowserRouter>

      <Routes>
      <Route exact path = '/tasks' element = {<Tasks/>}/>
      <Route exact path = '/classes' element = {<Classes/>}/>
      <Route exact path = '/login' element = {<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
