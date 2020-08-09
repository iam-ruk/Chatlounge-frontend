import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Form from './form';
import Chat from './chat';
import Join from './joins';
import Enter from './enter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Form}/>
        <Route path="/join" component={Join}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/enter" component={Enter}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
