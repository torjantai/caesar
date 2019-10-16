import React from 'react';
import logo from './logo.svg';
import './App.css';
import getBullshits from './getBullshits';
import decipher from './decipher';

const alphapet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö'];
console.log(alphapet.length)
const clearText = decipher(alphapet);

const bs = getBullshits().bullshits.slice(0, 5);
console.log(bs);

const decipherMessages = bs.map(row => {
  return clearText(row.message);
})

console.log(decipherMessages);

const qwer = alphapet.map((value, index) => {
  return decipherMessages.map(fn => fn(index))
});

console.log(qwer);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
