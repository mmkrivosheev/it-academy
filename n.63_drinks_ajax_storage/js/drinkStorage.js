const STORAGE_NAME = "KRIVOSHEEV_DRINK_STORAGE";
const btns = document.querySelectorAll(".btn");
const AJAXStorage = new AJAXStorageClass(STORAGE_NAME, lockInterface, onlockInterface);

function lockInterface() {
    for (let btn of btns) btn.disable = true;
}

function onlockInterface() {
    for (let btn of btns) btn.disable = false;
}

document.getElementById("btn-1").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    const isAlcoholic = confirm("ваш напиток алкогольный? (нажмите 'Отмена' - если нет)");
    const recipe = prompt("введите рецепт напитка");

    AJAXStorage.addValue(drink, {isAlcoholic, recipe});
});

document.getElementById("btn-2").addEventListener("click", () => {
    let drink = "";

    do {
        drink = prompt("введите название напитка");
    } while (drink === "");

    if (!drink) return;

    if (AJAXStorage.getValue(drink))
        alert(`
            напиток ${drink}
            алкогольный: ${AJAXStorage.getValue(drink).isAlcoholic ? "да" : "нет"}
            рецепт приготовления: ${AJAXStorage.getValue(drink).recipe || "(не указан)"}
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

    AJAXStorage.deleteValue(drink)
        ? alert(`напиток "${drink}" был удален`)
        : alert("данный напиток отсутствует в хранилище");
});

document.getElementById("btn-4").addEventListener("click", () => {
    let drinks = "";

    for (let key of AJAXStorage.getKeys())
        drinks += key + "\n";

    alert(drinks || "нет напитков в хранилище");
});