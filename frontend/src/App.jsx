import React from 'react';
import './App.css'
import Tasks from './components/Tasks';
import Classes from './components/Classes';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return(
    <div>
      <BrowserRouter>

      <Routes>
      <Route exact path = '/tasks' element = {<Tasks/>}/>
      <Route exact path = '/classes' element = {<Classes/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
