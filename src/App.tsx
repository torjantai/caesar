import React from 'react';
import logo from './logo.svg';
import './App.css';
import getBullshits from './getBullshits';
import decipher from './decipher';

const alphapet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', 'å', 'ä', 'ö',
];

console.log(alphapet.length)
const clearText = decipher(alphapet);

const bs = getBullshits().bullshits.slice();
// console.log(bs);

// 
const results = alphapet.map((_, index) => clearText(bs[10].message)(index));
console.log(results);

// discard sentences that contain any obviously impossible runs like 'zxcv'

// compare with statistics from Finnish language
// values from http://jkorpela.fi/kielikello/kirjtil.html
const totalChars = 3935153;
const finnishCharFreq = [
    457350, 2068, 1091, 33148, 323087, 1934, 4151, 71733, 421366, 75961, 207520, 226627, 137972,
    341181, 208923, 65358, 26, 85116, 309350, 388711, 196678, 96316, 329, 0, 71316, 0, 52, 189134, 18655,
];
const persentages = finnishCharFreq.map(freq => freq / totalChars);
// console.log(persentages);

// function to count chars
const count = (alphapet: string[]) => (sentenceArr: string[]) => {
    const charCounts = alphapet.map(_ => 0);
    return sentenceArr.reduce((acc, cur) => {
        const charIndex = alphapet.indexOf(cur);
        if (charIndex < 0) return acc;
        acc[charIndex] += 1;
        return acc;
    }, charCounts);
}

const countFinnish = count(alphapet);

const calcFitness = (countFn: (arr: string[]) => number[]) => (referenceFreqArr: number[]) => (sentence: string) => {
    const sentenceArray = Array.from(sentence);
    // console.log(sentenceArray);
    const counts = countFn(sentenceArray);
    const total = counts.reduce((acc, cur) => acc + cur);
    const persentages = counts.map(count => count / total);
    const diffs = persentages.map((persentage, index) => Math.abs(persentage - referenceFreqArr[index]));
    const diffSum = diffs.reduce((acc, cur) => acc + cur);
    // console.log(counts, persentages, diffs);
    return diffSum;
}


const fitness = calcFitness(countFinnish)(persentages);
const points = results.map(fitness);
console.log(points);










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
