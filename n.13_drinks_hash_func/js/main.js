function HashStorageFunc() {
    const storage = {};

    this.addValue = function (key, value) {
        storage[key] = value;
    }

    this.getValue = function (key) {
        return storage[key];
    }

    this.deleteValue = function (key) {
        if (!(key in storage)) return false;
        delete storage[key];
        return true;
    }

    this.getKeys = function () {
        return Object.keys(storage);
    }
}

const drinkStorage = new HashStorageFunc();

document.getElementById("btn-1").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    const isAlcoholic = confirm("ваш напиток алкогольный? (нажмите 'Отмена' - если нет)");
    const recipe = prompt("введите рецепт напитка");

    drinkStorage.addValue(drink, {isAlcoholic, recipe});
});

document.getElementById("btn-2").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    if (drinkStorage.getValue(drink))
        alert(`
            напиток ${drink}
            алкогольный: ${drinkStorage.getValue(drink).isAlcoholic ? "да" : "нет"}
            рецепт приготовления: ${drinkStorage.getValue(drink).recipe || "(не указан)"}
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
    ? alert(`напиток "${drink}" был удален`)
    : alert("данный напиток отсутствует в хранилище");
});

document.getElementById("btn-4").addEventListener("click", () => {
    let drinks = "";

    for (let key of drinkStorage.getKeys())
            drinks += key + "\n";

    alert(drinks || "нет напитков в хранилище");
});