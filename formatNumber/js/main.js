function formatNumber(num, format) {
    format = format.split(".");
    format[0] = format[0].split("").reverse();

    num = num.toFixed(format[1].length).split(".");
    num[0] = num[0].split("").reverse();

    for (let i = 0; i < num[0].length; i++) {
        if (format[0][i] === " ")
            num[0].splice(i, 0, " ");
    }

    num[0] = num[0].reverse().join("");
    return num.join(".");
}

const examples = [
    2.3,
    12345.368,
    12345678900.368,
    0,
];

for (let num of examples) {
    console.log(formatNumber(num, "# ### ###.##"));
}