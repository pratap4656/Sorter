import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingalgorithm';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        array: [],
        };
    }

    componentDidMount() {
        this.resetArray(205);
    }

    resetArray(num) {
        const array = [];
        for (let i = 0; i < num; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : '#6373ff';
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED_MS);
            } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS);
            }
          }
    }
    newarray(x) {
        this.resetArray(x)
    }


    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
        const array = [];
        const length = randomIntFromInterval(1, 1000);
        for (let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mergeSortedArray = getMergeSortAnimations(array.slice());
        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    } 

    render() {
        const {array} = this.state;

        return (
        <>
            <header>
                <button onClick={() => this.resetArray(randomIntFromInterval(150,200))}>new array
                </button>
                <input placeholder='set length of the array' id='xo'></input>
                <button onClick={() => this.newarray(document.getElementById('xo').value)}>set</button>
                <button onClick={() => this.mergeSort()}>mergeSort</button>
            </header>
            <div className="array-container">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    }}></div>
                ))}
            </div>
        </>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
