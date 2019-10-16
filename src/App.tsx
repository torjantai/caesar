import React from 'react';
import logo from './logo.svg';
import './App.css';
import getBullshits from './getBullshits';
import decipher, { transpose } from './decipher';

const alphapet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö'];
console.log(alphapet.length)
const clearText = decipher(alphapet);

const transTest = transpose(alphapet)(29, 'a');
console.log('test', transTest);

const bs = getBullshits().bullshits.slice(0, 10);
console.log(bs);

const results = alphapet.map((char, index) => clearText(bs[5].message)(index))
console.log(results);






const word = 'bouuj';
const antti = clearText(word)(1);
console.log(antti);





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
