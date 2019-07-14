import React from "react";
import logo from "./logo.svg";
import HomePage from './components/HomePage'
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HomePage />
        <a
          className="App-link"
          href="https://www.sphere.co.ke/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coming soon !
        </a>
      </header>
    </div>
  );
}

export default App;
