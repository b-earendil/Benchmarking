class Heap {
    constructor(numElts) {
        this.size = 0;
        this.capacity = numElts;
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


// let heap = new Heap(10);
// heap.insert(5);
// heap.insert(6);
// heap.insert(3);
// heap.insert(7);
// heap.insert(2);
// heap.insert(8);
// heap.insert(2);
// heap.insert(1);
// heap.insert(9);
// heap.insert(0);
// heap.insert(11);
// heap.insert(11);
// heap.insert(9);
// heap.insert(-5);
// heap.insert(-3);
// heap.insert(2);
// heap.insert(-1);

// let sortedArr = heap.sort();
// console.log(sortedArr);
// heap.print();

