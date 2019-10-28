import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { setCache, getCache } from "./utli";
import Login from "./pages/login";
import ManageInfo from "./pages/manageInfo";
import Info from "./pages/Info";

import './App.css';
import './fonts/iconfont.css'

function App() {
  const userDataObtained = userData => {
    setCache(userData);
  };
  
  return (
    <div className="App">
      <Router>
        <Route path="/login">
          <Login onUserDataObtained={ userDataObtained }/>
        </Route>
        <Route path="/manageInfo">
          <ManageInfo userData={ getCache("userData") }/>
        </Route>
        <Route path="/info">
          <Info userData={ getCache("userData") } />
        </Route>
      </Router>
    </div>
  );
}

export default App;
