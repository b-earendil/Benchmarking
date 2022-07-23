function merge(left, right) {
    let a = [];
    // while both have elements
    while(left.length && right.length) { 
        // insert the smaller element
        if(right[0] > left[0]) {
            a.push(left.shift());
        } else {
            a.push(right.shift());
        }
    }
    // handle any left over elements
    while(left.length) {
        a.push(left.shift());
    } 
    // handle any left over elements
    while(right.length) {
        a.push(right.shift());
    }
    return a;
}

function mergeSort(a) {
    let mid = Math.floor(a.length / 2);
    // base case, return
    if(a.length < 2) {
        return a;
    }
    // use splice to obtain left and right arrays
    let l = a.splice(0, mid);
    console.log('l ', l);
    console.log('a ', a);
    // recurse and merge
    return merge(mergeSort(l), mergeSort(a));
}

let a = [1, 0, -9, 100, 12, -3, 5];
console.log(mergeSort(a));