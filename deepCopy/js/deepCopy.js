function deepCopy(src) {
    if (typeof src !== "object" || src === null)
        return src;

    if (Array.isArray(src))
        return deepCopyArray(src);

    return deepCopyObject(src);
}

function deepCopyArray(src) {
    const copy = [];

    for (let i = 0; i < src.length; i++)
        copy[i] = deepCopy(src[i]);

    return copy;
}

function deepCopyObject(src) {
    const copy = {};

    for (let key in src)
        copy[key] = deepCopy(src[key]);

    return copy;
}