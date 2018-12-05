import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

const App = props => {
  return (
    <div className="App">
      <ul>
        <li><Link to="/form"> Form </Link></li>
        <li><Link to="/grid"> Grid </Link></li>
      </ul>
      { props.children }
    </div>
  );
}

export default App;
