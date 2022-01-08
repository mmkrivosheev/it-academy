function deepCopy(src) {
    if (typeof src !== "object" || src === null)
        return src;

    if (Array.isArray(src))
        return deepCopyArray(src);

    return deepCopyObject(src);
}

function deepCopyArray(src) {
    const copy = [];

    for (let i = 0; i < src.length; i++) {
        if (typeof src[i] !== "object")
            copy[i] = src[i];
        else
            copy[i] = deepCopy(src[i]);
    }

    return copy;
}

function deepCopyObject(src) {
    const copy = {};

    for (let key in src) {
        if (typeof src[key] !== "object")
            copy[key] = src[key];
        else
            copy[key] = deepCopy(src[key]);
    }

    return copy;
}