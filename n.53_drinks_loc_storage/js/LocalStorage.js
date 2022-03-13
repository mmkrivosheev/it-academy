class LocalStorage {
    constructor(name) {
        this.storageName = name;
        this.storage = localStorage[name]
            ? JSON.parse(localStorage.getItem(name))
            : {};
    }

    addValue(key, value) {
        this.storage[key] = value;
        const json = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, json);
    }

    getValue(key) {
        return this.storage[key];
    }

    deleteValue(key) {
        if (!(key in this.storage)) return false;
        delete this.storage[key];
        const json = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, json);
        return true;
    }

    getKeys() {
        return Object.keys(this.storage);
    }
}