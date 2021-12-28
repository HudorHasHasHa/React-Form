import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import './App.scss'
import Form from './components/form/form';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/form' element={<Form/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
