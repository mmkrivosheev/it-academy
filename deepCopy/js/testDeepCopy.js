const typesForTest = {
    nan: [testIsTypeof, testIsNan],
    primitive: [testIsTypeof, testIsEqual],
    array: [testIsEqualObj, testIsTypeof, testInstanceof],
    hash: [testIsEqualObj, testIsTypeof]
};

function testDeepCopy(src, copy) {
    let count1 = 0;
    let count2 = 0;

    if (Number.isNaN(copy)) {
        typesForTest.nan.forEach(n => n(src, copy) ? count1++ : count2++);
        return {status: !count2, count1, count2};
    }

    if (typeof copy !== "object" || copy === null) {
        typesForTest.primitive.forEach(n => n(src, copy) ? count1++ : count2++);
        return {status: !count2, count1, count2};
    }

    if (Array.isArray(copy)) {
        typesForTest.array.forEach(n => n(src, copy) ? count1++ : count2++);
        copy.forEach((n, i) => {
            let result = testDeepCopy(src[i], n);
            count1 += result.count1;
            count2 += result.count2;
        });

        return {status: !count2, count1, count2};
    }

    if (typeof copy === "object") {
        typesForTest.hash.forEach(n => n(src, copy) ? count1++ : count2++);
        for (let key in copy) {
            let result = testDeepCopy(src[key], copy[key]);
            count1 += result.count1;
            count2 += result.count2;
        }

        return {status: !count2, count1, count2};
    }
}

function testIsNan(copy) {
    return isNaN(copy);
}

function testIsTypeof(src, copy) {
    return typeof src === typeof copy;
}

function testIsEqual(src, copy) {
    return src === copy;
}

function testIsEqualObj(src, copy) {
    return src !== copy;
}

function testInstanceof(src, copy) {
    return copy instanceof Array;
}

const examplesForTest = {
    a: [5, "sss", undefined, null, Number.NaN],
    b: [5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN],
    c: {a:5, b:"sss", c:undefined, d:null, e:Number.NaN},
    d: {a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN},
    e: [5,7,[4,[2],8,[1,Number.NaN],2],[9,[{b1:undefined,b2:7},[33,null]]],1,8],
    f: 5,
    g: "sss",
    h: null,
    i: Number.NaN,
};

for (let key in examplesForTest) {
    const copy = deepCopy(examplesForTest[key]);
    const result = testDeepCopy(examplesForTest[key], copy);
    console.log(
        `${result.status ? "прошёл" : "НЕ ПРОШЁЛ"},`,
        `пройдено тестов - ${result.count1},`,
        `не пройдено тестов - ${result.count2}`
    );
}
