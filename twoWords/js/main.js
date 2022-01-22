function getStringByTwoWords(start, end, set) {
    const arr = getWords(start, end, set);
    return arr.join("-") || "в наборе нет подходящих слов";
}

function getWords(start, end, set) {
    let arr = [];

    set = set.filter(n => n !== start);

    if (compareWords(start, end))
        return [start, end];

    for (let i = 0; i < set.length; i++) {
            if (compareWords(set[i], start))
                arr.push([start, ...getWords(set[i], end, set)]);
    }

    arr = arr.filter(n => n[n.length - 1] === end);

    if (arr.length)
        return arr.reduce((prev, cur) => prev.length < cur.length ? prev : cur);

    return [];
}

function compareWords(word1, word2) {
    let count = 0;

    for (let i = 0; i < word1.length; i++)
        if (word1[i] === word2[i]) count++;

    return word1.length - count === 1;
}

let set = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК",
    "ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];

console.log(getStringByTwoWords("ЛИСА", "ЛОСЬ", set));
console.log(getStringByTwoWords("МУХА", "СЛОН", set));

