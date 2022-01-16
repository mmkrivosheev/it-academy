const str = prompt("введите строку");

if (str)
    console.log(
        "количесво русских гласных букв в строке:",
        calculateVowelsByForEach(str),
        calculateVowelsByFilter(str),
        calculateVowelsByReduce(str)
    );

function calculateVowelsByForEach(str) {
   const vowels = ["а", "у", "о", "и", "э", "ы", "е", "ё", "ю", "я"];
   let count = 0;

    str = [...str.toLowerCase()];
    str.forEach(n => {
       if (vowels.includes(n))
           count++;
    });

    return count;
}

function calculateVowelsByFilter(str) {
    const vowels = ["а", "у", "о", "и", "э", "ы", "е", "ё", "ю", "я"];

    str = [...str.toLowerCase()];
    str = str.filter(n => vowels.includes(n));

    return str.length;
}

function calculateVowelsByReduce(str) {
    const vowels = ["а", "у", "о", "и", "э", "ы", "е", "ё", "ю", "я"];

    str = [...str.toLowerCase()];
    str = str.reduce((prev, cur) => {
        return vowels.includes(cur) ? prev + cur : prev;
    }, "");

    return str.length;
}
