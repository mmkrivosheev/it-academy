function deepComp(src1, src2) {

    if (!checkIsSameType(src1, src2))
        return false;

    if (Number.isNaN(src1) && Number.isNaN(src2))
        return true;

    if (typeof src1 !== "object" || src1 === null)
        return src1 === src2;

    if (Array.isArray(src1)) {
        if (src1.length !== src2.length)
            return false;

        return src1.every((n, i) => deepComp(n, src2[i]));
    }

    if (Object.keys(src1).length !== Object.keys(src2).length)
        return false;

    for (let key in src1) {
        if (!(key in src2)) return false;

        if (deepComp(src1[key], src2[key])) continue;

        return false;
    }

    return true;
}

function checkIsSameType(src1, src2) {
    const type1 = src1 === null ? "null"
        : Array.isArray(src1) ? "array" : typeof src1;

    const type2 = src2 === null ? "null"
        : Array.isArray(src2) ? "array" : typeof src2;

    return type1 === type2;
}

const H1 = {a:5, b:{b1:6, b2:7}};
const H2 = {b:{b1:6, b2:7}, a:5};
const H3 = {a:5, b:{b1:6}};
const H4 = {a:5, b:{b1:66, b2:7}};
const H5 = {a:5, b:{b1:6, b2:7, b3:8}};
const H6 = {a:null, b:undefined, c:Number.NaN};
const H7 = {c:Number.NaN, b:undefined, a:null};
const H8 = {a:5, b:6};
const H9 = {c:5, d:6};
const H10 = {a:5};
const A1 = [5, 7];
const A2 = [5, 5, 7];
const A3 = [5, 8, 7];
const A5 = [5, 7, [4, [2], 8, [1, Number.NaN], 2],[9, [{b1:undefined, b2:7}, [33, null]]], 1, 8];
const A6 = [5, 7, [4, [2], 8, [1, Number.NaN], 2],[9, [{b2:7, b1:undefined}, [33, null]]], 1, 8];

let examples = [
    [true, [H1, H2]],
    [false, [H1, H3]],
    [false, [H1, H4]],
    [false, [H1, H5]],
    [true, [H6, H7]],
    [false, [H8, H9]],
    [false, [H8, H10]],
    [false, [null, H10]],
    [false, [H10, null]],
    [true, [null, null]],
    [false, [null, undefined]],
    [false, [5, "5"]],
    [false, [5, H1]],
    [false, [A1, H1]],
    [false, [A2, A3]],
    [false, [{a:5, b:undefined}, {a:5, c:undefined}]],
    [false, [[5,7], {0:5,1:7}]],
    [false, [[5,7], {0:5,1:7, length:2}]],
    [false, ["aaa", "bbb"]],
    [true, [Number.NaN, Number.NaN]],
    [true, [A5, A6]],
];

let count1 = 0;
let count2 = 0;

examples.forEach(n => n[0] === deepComp(n[1][0], n[1][1])
    ? count1++
    : count2++
);

console.log(
    `${!count2 ? "прошёл" : "НЕ ПРОШЁЛ"},`,
    `пройдено тестов - ${count1},`,
    `не пройдено тестов - ${count2}`
);