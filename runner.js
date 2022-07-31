// Student: Ben Adams
// Course: CS81 JavaScript
// Instructor: Professor Seno

// HEAP
class Heap {
    constructor(numElts) {
        this.size = 0;
        this.heap = []
    }

    left(index) {
        let n = this.size;
        if(2*index+1 < n) { // if left child exists
            return 2*index+1;
        } else {
            return n+1; // does not exist
        }
    }

    right(index) {
        let n = this.size;
        if(2*index+2 < n) { // if right child exists
            return 2*index+2;
        } else {
            return n+1 // does not exist
        }
    }

    hasParent(index) {
        if(index==0) { // if root
            return false;
        } else if(Math.floor((index-1)/2) > 0) { // valid parent
            return true;
        }
    }

    swap(index1, index2) {
        let n = this.size;
        if(index1 < n && index2 < n) { // if within range
            [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
            return this.heap;
        } else {
            return;
        }
    }

    bubbleUp(index) {
        if(index <= 0) { // already at root
            return;
        } else {
            if(this.heap[index] < this.heap[Math.floor((index-1)/2)]) { // in wrong relation with parent
                this.swap(index, Math.floor((index-1)/2));
                this.bubbleUp(Math.floor((index-1)/2));
            }
        }
        return
    }

    bubbleDown(index) {
        let n = this.size;
        let leftIndex = this.left(index);
        let rightIndex = this.right(index);
        let smaller;
        if(leftIndex > n) { // this.heap has no children
            return;
        }
        if(leftIndex <= n && rightIndex > n) { // this.heap has 1 child
            if(this.heap[index] > this.heap[leftIndex]) {
                this.swap(index, leftIndex);
                this.bubbleDown(leftIndex);
            } 
        }
        // locate the smaller child
        else if(this.heap[index] > this.heap[rightIndex] || this.heap[index] > this.heap[leftIndex]) { // this.heap has two children
            if(this.heap[leftIndex] < this.heap[rightIndex]) {
                smaller = leftIndex
            } else {
                smaller = rightIndex;
            }
            this.swap(index, smaller);
            this.bubbleDown(smaller);
        }
    }

    insert(element) {
        let n = this.size;
        this.heap.push(element);
        this.size++;
        this.bubbleUp(n);
    }

    delete(index) {
        let n = this.size;
        let leftIndex = this.left(index);
        let rightIndex = this.right(index);
        this.heap[index] = this.heap[n-1]; // replace heap_i with last element in the heap
        this.heap.pop(); // remove last element in the heap
        this.size--; // decrement size property

        // if not root and smaller than parent
        if(this.hasParent(index) && this.heap[index] > this.heap[Math.floor(index-1)/2]) {
            this.bubbleUp(index);
        } else {
            this.bubbleDown(index);
        }
        return this.heap;
    }

    sort() {
        let sorted = [];
        let i = 0;
        while(this.size) {
            sorted.push(this.heap[0]);
            this.heap = this.delete(0);
        }
        return sorted;
    }

    print() {
        for(let i = 0; i < this.size; i++) {
            console.log(this.heap[i]);
        }
    }
}

// ------------------------------------------------------------------------------

// MERGESORT
function merge(a, l, m, h) {
    let i = 0; // start of left subarray
    let j = 0; // start of right subarray
    let k = l; // start of merged subarray

    let leftSize = m - l + 1;
    let rightSize = h - m;

    let tempLeft = [leftSize];
    let tempRight = [rightSize];

    // copy elements to left temp array
    for(let i = 0; i < leftSize; i++) {
        tempLeft[i] = a[l + i]; // get elt at correct offset
    }
    // copy elements to right temp array
    for(let j = 0; j < rightSize; j++) {
        tempRight[j] = a[m+1+j]; // get elt at correct offset
    }
    // merge
    while(i < leftSize && j < rightSize) {
        if(tempLeft[i] <= tempRight[j]) {
            a[k++] = tempLeft[i++];
        } else {
            a[k++] = tempRight[j++];
        }
    }
    // copy any remaining elements from left
    while(i<leftSize){
        a[k++] = tempLeft[i++];
    }
    // copy any remaining elements from right
    while(j<rightSize){
        a[k++] = tempRight[j++];
    }
}

function mergeSort(a, l, h) {
    if(l<h) {
        let mid = Math.floor((l+h)/2);
        mergeSort(a, l, mid);
        mergeSort(a, mid+1, h);
        merge(a, l, mid, h);
    }
}

// ------------------------------------------------------------------------------

// BUBBLESORT
function bubbleSort(a) {
    for(let i = 0; i < a.length-1; i++){
        for(let j = 0; j < a.length-i-1; j++) {
            if(a[j] > a[j+1]){
                // swap
                let temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    return a;
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// SCRIPT: RUN AND GRAPH

function runHeapSort(inputSizes) {
        // HeapSort
        let heapSortRuntimes = [];
        for(let i = 0; i< inputSizes.length; i++) {
            let heap = new Heap();
            for(let j = 0; j < inputSizes[i]; j++){
                heap.insert(Math.floor(Math.random()*100000)); // insert random number between 0 and 100,000
            }
            let start = Date.now(); // start timer
            let sorted = heap.sort();
            let end = Date.now(); // end timer
            let diff = (end-start)/1000; // time in seconds
            //console.log(sorted);
            heapSortRuntimes.push(diff);
        }
        console.log('heapSort runtimes', heapSortRuntimes);
        return heapSortRuntimes;    
}

function runMergeSort(inputSizes){
        // MERGESORT
        let mergeSortRuntimes = [];
        for(let i = 0; i < inputSizes.length; i++) {
            let a = [];
            for(let j = 0; j < inputSizes[i]; j++){
                a.push(Math.floor(Math.random()*100000)); // insert random number between 0 and 100,000 
            }
            start = Date.now(); // start timer
            mergeSort(a, 0, a.length-1);
            end = Date.now(); // end timer
            diff = (end-start)/1000; // time in seconds
            mergeSortRuntimes.push(diff);
            // console.log(a);
        }
        console.log('mergeSort runtimes', mergeSortRuntimes);
        return mergeSortRuntimes;
    
}

function runBubbleSort(inputSizes) {
        // BUBBLESORT
        let bubbleSortRuntimes = [];
        for(let i = 0; i < inputSizes.length; i++) {
            let a = [];
            for(let j = 0; j < inputSizes[i]; j++){
                a.push(Math.floor(Math.random()*100000)); // insert random number between 0 and 100,000 
            }
            start = Date.now(); // start timer
            let bsorted = bubbleSort(a);
            end = Date.now(); // end timer
            diff = (end-start)/1000; // time in seconds
            bubbleSortRuntimes.push(diff);
        }
        console.log('bubbleSort runtimes', bubbleSortRuntimes);
        return bubbleSortRuntimes;
}

function runner(elt) {
    let heapSortRuntimes, mergeSortRuntimes, bubbleSortRuntimes;
    if(elt === 'runAll'){
        const inputSizes = [10000, 100000, 200000];
        console.log('input sizes', inputSizes.toLocaleString());
        // HEAPSORT
        heapSortRuntimes = runHeapSort(inputSizes);
        // MERGESORT
        mergeSortRuntimes = runMergeSort(inputSizes);
        // BUBBLESORT
        bubbleSortRuntimes = runBubbleSort(inputSizes);
        // call graphing function
        grapher(elt, inputSizes, heapSortRuntimes, mergeSortRuntimes, bubbleSortRuntimes);
    } else {
        const inputSizes = [10000, 100000, 1000000, 10000000];
        console.log('input sizes', inputSizes.toLocaleString());
        // HEAPSORT
        heapSortRuntimes = runHeapSort(inputSizes);
        // MERGESORT
        mergeSortRuntimes = runMergeSort(inputSizes);
        // call graphing function
        grapher(elt, inputSizes, heapSortRuntimes, mergeSortRuntimes);
    }

}

function grapher(elt, inputSizes, heapSortRuntimes, mergeSortRuntimes, bubbleSortRuntimes) {
    var traceHeapSort = {
        x: inputSizes,
        y: heapSortRuntimes, 
        name:'HeapSort',
        mode:'lines+markers'
    };
    var traceMergeSort = {
        x: inputSizes,
        y: mergeSortRuntimes, 
        name: 'MergeSort',
        mode:'lines+markers'
    };
    if(elt === "runAll") {
        var traceBubbleSort = {
            x: inputSizes,
            y: bubbleSortRuntimes,
            name: 'BubbleSort',
            mode:"lines+markers"
        };
        var data = [traceHeapSort, traceMergeSort, traceBubbleSort];
        var layout = {
            title:"Benchmarking All Algorithms",
            ticksuffix: "secs"
        };
        Plotly.newPlot('plot', data, layout);
    } else {
        var data = [traceHeapSort, traceMergeSort];
        var layout = {
            title:"Benchmarking Heap and Merge Sort Algorithms",
            ticksuffix: "secs"
        };
        Plotly.newPlot('plot', data, layout);
    }
}