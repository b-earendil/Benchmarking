function bubbleSort(a) {
    for(let i = 0; i < a.length-1; i++){
        for(let j = 0; j < a.length-i-1; i++) {
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

let a = [10, -9, 0, 50, 1, -8, -3, 10];
console.log(bubbleSort(a));