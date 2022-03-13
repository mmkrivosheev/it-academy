const dishStorage = new LocalStorage("dishStorage");

document.querySelector(".dish .btn-1").addEventListener("click", () => {
    let dish = "";

    do {
        dish = prompt("введите название блюда");
    } while (dish === "");

    if (!dish) return;

    const isAlcoholic = confirm("ваше блюдо вегетарианское? (нажмите 'Отмена' - если нет)");
    const recipe = prompt("введите рецепт блюда");

    dishStorage.addValue(dish, {isAlcoholic, recipe});
});

document.querySelector(".dish .btn-2").addEventListener("click", () => {
    let dish = "";

    do {
        dish = prompt("введите название блюда");
    } while (dish === "");

    if (!dish) return;

    if (dishStorage.getValue(dish))
        alert(`
            блюдо ${dish}
            вегетарианское: ${dishStorage.getValue(dish).isAlcoholic ? "да" : "нет"}
            рецепт приготовления: ${dishStorage.getValue(dish).recipe || "(не указан)"}
        `);
    else
        alert("данное блюдо отсутствует в хранилище");
});

document.querySelector(".dish .btn-3").addEventListener("click", () => {
    let dish = "";

    do {
        dish = prompt("введите название блюда");
    } while (dish === "");

    if (!dish) return;

    dishStorage.deleteValue(dish)
        ? alert(`блюдо "${dish}" было удалено`)
        : alert("данное блюдо отсутствует в хранилище");
});

document.querySelector(".dish .btn-4").addEventListener("click", () => {
    let drinks = "";

    for (let key of dishStorage.getKeys())
        drinks += key + "\n";

    alert(drinks || "нет блюда в хранилище");
});