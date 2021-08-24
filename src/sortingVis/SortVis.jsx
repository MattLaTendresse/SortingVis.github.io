import React from 'react';
import {getMergeSortAnimations,getInsertionSortAnimations,getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortVis.css';
import Popup from './Popup'
import './Popup.css'



const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
//const [buttonPopup,setButtonPopup] = useState(false);



export default class SortVis extends React.Component{
  
    //array constructor
    constructor(probs){
      super(probs);
    
    this.numberOfBars = screenWidth / 4 - 20;
    this.primaryColor = "aqua";
    this.secondaryColor = "red";
    this.barHeight = screenHeight - 100;
  
        this.state ={
            array: [], 
            Popup:false
        };
    }

    //reset array
    componentDidMount(){
        this.resetArray();
    }
    //define array reset 
    resetArray(){
      
        const array=[];
        for(let i=0;i<this.numberOfBars;i++){
            array.push(randomInt(10,this.barHeight));
            array.backgroundColor = 'black';
        }
        
        this.setState({array});
    }

    

    //sorts
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'black' : 'green';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 1);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 1);
        }
        }
        console.log(animations);
    }

     insertionSort(){
      const animations = getInsertionSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange === true) {
          const color = animations[i][0] === "comparison1" ? 'black' : 'green';
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i *0.45);
        } else {
          const [, barIndex, newHeight] = animations[i];
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * 0.45);
        }
      }

    }


    bubbleSort(){
      const animations = getBubbleSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange) {
          const color = animations[i][0] === "comparison2" ? 'green': 'black';
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * 0.75);
        } else {
          const [, barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * 0.75);
    }
  }
    
}
 

  


    //render our the array to screen 
    render() {
        const {array} = this.state;

    return (
      <div className = "body">
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{ backgroundColor: 'black', height: `${value}px`,}}></div>
        ))}
            <button className ="button" onClick={() => this.resetArray()}>Generate New Array</button>
            <button className ="button" onClick={() => {this.mergeSort();this.setState({Popup: true})}}>Merge Sort</button>
            <button className ="button" onClick={() => {this.insertionSort();this.setState({Popup: true})}}>Insertion Sort</button>
            <button className ="button" onClick={() => {this.bubbleSort();this.setState({Popup: true})}}>Bubble Sort</button>
            <Popup trigger={this.state.Popup == true} setTrigger={this.state.Popup == false}>
              <button  className="close" onClick={() => {this.setState({Popup: false})}}>close</button>
              <h3>Sorting Algorithms, and their time and space complexity!</h3>
              <p>Merge Sort: Average time complexity O(nLogn), space complexity is O(n)</p>
              <p>Insertion Sort: Average time complexity O(n^2), space complexity is O(1)</p>
              <p>Bubble Sort: Average time complexity O(n^2), space complexity is O(1)</p>
              </Popup>
        </div>
        </div>
        );
    
    }
}

//random number func
function randomInt(low,up) {
        return Math.floor(Math.random() *  (up - low +1)+low);
    }
