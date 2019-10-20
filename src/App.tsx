import React from 'react';
import logo from './logo.svg';
import './App.css';
import getBullshits from './getBullshits';
import decipher from './decipher';
import { number } from 'prop-types';

const alphapet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', 'å', 'ä', 'ö',
];

console.log(alphapet.length)
const clearText = decipher(alphapet);

const bs = getBullshits().bullshits.slice();
// console.log(bs);

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
    const expected = referenceFreqArr.map(freq => freq * sentenceArray.length);
    const counts = countFn(sentenceArray);
    const chiSquares = counts.map((count, i) => {
        const e = expected[i];
        if (e === 0) return 0;
        return Math.pow((count - e), 2) / e;
    });
    const sum = chiSquares.reduce((acc, cur) => acc + cur);
    // console.log('exp\n', expected, 'counts\n', counts, 'chiSquares\n', chiSquares, sum);
    return sum;
}


const fitness = calcFitness(countFinnish)(persentages);

const getFittestDecipher = (ciphertext: string) => {
    const asdt = clearText(ciphertext);
    const deciphers = alphapet.map((_, i) => asdt(i));
    // console.log(deciphers);
    const fitnesses = deciphers.map(decipher => fitness(decipher));
    // find the lowest in fitnesses and return matching dehiphers
    // console.log(fitnesses);
    const fittestIndex = fitnesses.reduce((acc, cur, i) => {
        if (cur < acc.value) {
            acc.value = cur;
            acc.index = i;
        }
        return acc;
    }, { value: Number.MAX_SAFE_INTEGER, index: -1 });
    // console.log(fittestIndex);
    return {
        result: deciphers[fittestIndex.index],
        fitness: fittestIndex.value,
    };
}

const all = bs.map(row => getFittestDecipher(row.message));
console.log(JSON.stringify(all, null, 2));










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
