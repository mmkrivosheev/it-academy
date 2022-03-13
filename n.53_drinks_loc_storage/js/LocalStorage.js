class LocalStorage {
    constructor() {
        this.storage = localStorage.storage
            ? JSON.parse(localStorage.getItem("storage"))
            : {};
    }

    addValue(key, value) {
        this.storage[key] = value;
        const json = JSON.stringify(this.storage);
        localStorage.setItem("storage", json);
    }

    getValue(key) {
        return this.storage[key];
    }

    deleteValue(key) {
        if (!(key in this.storage)) return false;
        delete this.storage[key];
        const json = JSON.stringify(this.storage);
        localStorage.setItem("storage", json);
        return true;
    }

    getKeys() {
        return Object.keys(this.storage);
    }
}