function HashStorageFunc() {
    this.addValue = function (key, value) {
        this[key] = value;
    }

    this.getValue = function (key) {
        return this[key];
    }

    this.deleteValue = function (key) {
        if (!(key in this)) return false;
        delete this[key];
        return true;
    }

    this.getKeys = function () {
        return Object.keys(this);
    }
}

const drinkStorage = new HashStorageFunc();

document.getElementById("btn-1").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    const isAlcoholic = confirm("ваш напиток алкогольный? (нажмите 'Отмена' - если нет)") ? "да" : "нет";
    const recipe = prompt("введите рецепт напитка") || "не указан";

    drinkStorage.addValue(drink, {isAlcoholic, recipe});
});

document.getElementById("btn-2").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    if (drink in drinkStorage)
        alert(`
            напиток ${drink}
            алкогольный: ${drinkStorage.getValue(drink).isAlcoholic}
            рецепт приготовления: ${drinkStorage.getValue(drink).recipe}
        `);
    else
        alert("данный напиток отсутствует в хранилище");
});

document.getElementById("btn-3").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    drinkStorage.deleteValue(drink)
    ? alert(`напиток ${drink} был удален`)
    : alert("данный напиток отсутствует в хранилище");
});

document.getElementById("btn-4").addEventListener("click", () => {
    let drinks = "";

    for (let key of drinkStorage.getKeys())
        if (typeof drinkStorage[key] !== "function")
            drinks += key + "\n";

    alert(drinks || "нет напитков в хранилище");
});