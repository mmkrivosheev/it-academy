const arr = [5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8];

function treeSum(arr) {
    let sum = 0;

    arr.forEach(item => {
        if (typeof item === "number") 
            sum += item;
        else 
            sum += treeSum(item);        
    });

    return sum;
}

console.log(treeSum(arr));