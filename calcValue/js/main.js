function calcValue(str) {

    if (isFinite(str)) return +str;

    const operator = ["*", "/", "-", "+"];
    const memory = [];
    let arr = [];
    let num = "";

    for (let i = 0; i < str.length; i++) {

        if (str[i] === "(" && !memory.length) {
            memory.push("(");
            continue;
        }

        if (str[i] === "(" && memory.length) {
            memory.push("(");
        }

        if (str[i] === ")") {
            memory.pop();
            if (!memory.length) continue;
        }

        if (memory.length) {
            num += str[i];
            if (i === str.length - 2) arr.push(num);
            continue;
        }

        if (!(operator.includes(str[i]))) {
            num += str[i];
            if (i === str.length - 1) arr.push(num);
            continue;
        }

        arr.push(num);
        arr.push(str[i]);
        num = "";
    }

    if (arr.length === 1) return calcValue(arr[0]);

    arr = performMultiplication(arr);
    arr = performDivision(arr);
    arr = performSubtraction(arr);
    arr = performAddition(arr);

    return arr[0];
}

function performMultiplication(arr) {
    if (!(arr.includes("*"))) return arr;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            arr.splice(i - 1, 3, +calcValue(arr[i - 1]) * +calcValue(arr[i + 1]));
            return performMultiplication(arr);
        }
    }
}

function performDivision(arr) {
    if (!(arr.includes("/"))) return arr;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "/") {
            arr.splice(i - 1, 3, +calcValue(arr[i - 1]) / +calcValue(arr[i + 1]));
            return performDivision(arr);
        }
    }
}

function performSubtraction(arr) {
    if (!(arr.includes("-"))) return arr;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "-") {
            arr.splice(i - 1, 3, +calcValue(arr[i - 1]) - +calcValue(arr[i + 1]));
            return performSubtraction(arr);
        }
    }
}

function performAddition(arr) {
    if (!(arr.includes("+"))) return arr;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+") {
            arr.splice(i - 1, 3, +calcValue(arr[i - 1]) + +calcValue(arr[i + 1]));
            return performAddition(arr);
        }
    }
}

let examples = [
    ["2*(-3+1)", -4],
    ["2*3-10*10", -94],
    ["(2*3-10*10)", -94],
    ["(2*3-10)*10", -40],
    ["(2*(3-10))*10", -140],
    ["-10+50", 40],
    ["((((2*(2+8))+10)*2)+10)*(1+1)", 140],
];

let count1 = 0;
let count2 = 0;

examples.forEach(n => n[1] === calcValue(n[0])
    ? count1++
    : count2++
);

console.log(
    `${!count2 ? "прошёл" : "НЕ ПРОШЁЛ"},`,
    `пройдено тестов - ${count1},`,
    `не пройдено тестов - ${count2}`
);

// console.log(calcValue("2*(-3+1)"));
// console.log(calcValue("2*3-10*10"));
// console.log(calcValue("(2*3-10*10)"));
// console.log(calcValue("(2*3-10)*10"));
// console.log(calcValue("(2*(3-10))*10"));
// console.log(calcValue("-10+50"));
// console.log(calcValue("((((2*(2+8))+10)*2)+10)*(1+1)"));