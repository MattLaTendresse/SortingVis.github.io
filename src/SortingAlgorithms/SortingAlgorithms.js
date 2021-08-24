import {useState} from 'react';

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}



//divide and conquer algo 
//breaks it into smaller sorted arrays based on an index
export function quickSortHelp(array,left,right){
  const animations = [];
  var index;
  if (array.length > 1) {
      index = partition(array, left, right,animations); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSortHelp(array, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSortHelp(array, index, right);
      }
  }
  return animations;
}
function partition(array = [], left, right, animations = []) {
  let pivot = array[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (array[i] < pivot) i++;

      while (array[j] > pivot) j--;

      if (i <= j) {
          swap(array,i, j);
          animations.push([i, j, array[i++], array[j--]]);
      }
  }
  return i;
}


export function getBubbleSortAnimations(array) {
  let animations = [];
  let helperArray = array.slice();
  bubbleSort(helperArray, animations);
  return animations;
}

function bubbleSort(helperArray, animations) {
  const length = helperArray.length;
  let x = length - 1;
  while (x > 0) {
    let swapped = false;
    for (let i = 0; i < x; ++i) {
      animations.push(["comparison1", i, i + 1]);
      animations.push(["comparison2", i, i + 1]);
      if (helperArray[i] > helperArray[i + 1]) {
        swapped = true;
        animations.push(["swap", i, helperArray[i + 1]]);
        animations.push(["swap", i + 1, helperArray[i]]);
        swap(helperArray, i, i + 1);
      }
    }
    if (!swapped) break;
    x--;
  }
}

export function getInsertionSortAnimations(array) {
  let animations = [];
  let helperArray = array.slice();
  insertionSort(helperArray, animations);
  return animations;
}

function insertionSort(helperArray, animations) {
  const length = helperArray.length;
  for (let i = 1; i < length; i++) {
    let position = helperArray[i];
    let j = i - 1;
    animations.push(["comparison1", j, i]);
    animations.push(["comparison2", j, i]);
    while (j >= 0 && helperArray[j] > position) {
      animations.push(["overwrite", j + 1, helperArray[j]]);
      helperArray[j + 1] = helperArray[j];
      j = j - 1;
      if (j >= 0) {
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
      }
    }
    animations.push(["overwrite", j + 1, position]);
    helperArray[j + 1] = position;
  }
}

function swap(helperArray, firstIndex, secondIndex) {
  let temp = helperArray[firstIndex];
  helperArray[firstIndex] = helperArray[secondIndex];
  helperArray[secondIndex] = temp;
}

