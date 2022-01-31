//размер поля по ширине/высоте, размер ячейки поля,
//количество клеток в каждом жителе, количество жителей
game(80, 80, 8, 5, 30); 

function game(width, height, sizeCell, n, total) {
    const htmlBody = document.body;
    const wrapper = document.createElement("wrapper");
    const div = document.createElement("div");
    const btn_1 = createButton("добавить жителей", true);
    const btn_2 = createButton("старт", false);
    const field = createField(width, height, sizeCell);
    let body = []; //все темные точки на поле

    wrapper.classList.add("wrapper");

    div.append(btn_1, btn_2);
    wrapper.append(...field);
    htmlBody.prepend(wrapper, div);

    btn_1.addEventListener("click", () => {
        btn_1.disabled = true;
        btn_2.disabled = false;

        for (let i = 0; i < total; i++)
            body.push(...randomBody(width, height, n));

        for (let i of body)
            document.querySelector(`[data-cell="${i[0]},${i[1]}"]`)
                .style.backgroundColor = "gray";

    });

    btn_2.addEventListener("click", () => {
        btn_2.disabled = true;
        getNext(body,width, height);
    });
}

//создает следующую растановку клеток на поле согасно правил игры
function getNext(body, width, height) {
    const add = [];
    const remove = [];

    for (let cell of getAllEmptyCellsNearBody(body)) {
        if (checkIsGetLife(cell, body)) {
            add.push(infiniteField(cell, width, height));
        }
    }

    for (let cell of body) {
        if (checkIsLoseLife(cell, body))
            remove.push(cell);
    }

    for (let i of add) {
        body.push(i);
        document.querySelector(`[data-cell="${i[0]},${i[1]}"]`)
            .style.backgroundColor = "gray";
    }

    for (let i of remove) {
        excludeArray(body, i);
        document.querySelector(`[data-cell="${i[0]},${i[1]}"]`)
            .style.backgroundColor = "";
    }

    setTimeout(() => getNext(body, width, height), 200);
}

//определяет всех соседей пустой клеткии и считает сколько из них
//попадает в body, если три - true, иначе - false
function checkIsGetLife(emptyCell, body) {
    let count = 0;

    const cells = [
        [emptyCell[0] - 1, emptyCell[1] - 1],
        [emptyCell[0] - 1, emptyCell[1]],
        [emptyCell[0] - 1, emptyCell[1] + 1],
        [emptyCell[0], emptyCell[1] + 1],
        [emptyCell[0] + 1, emptyCell[1] + 1],
        [emptyCell[0] + 1, emptyCell[1]],
        [emptyCell[0] + 1, emptyCell[1] - 1],
        [emptyCell[0], emptyCell[1] - 1]
    ];

    for (let cell of cells)
        if (checkIsIncludeArray(body, cell)) count++;

    return count === 3;
}

//проверяет клетку, входящую в состав body на количество клеток-соседей,
//которые принадлежат body, если меньше двух иди более трех - false
function checkIsLoseLife(cell, body) {
    let count = 0;

    const cells = [
        [cell[0] - 1, cell[1] - 1],
        [cell[0] - 1, cell[1]],
        [cell[0] - 1, cell[1] + 1],
        [cell[0], cell[1] + 1],
        [cell[0] + 1, cell[1] + 1],
        [cell[0] + 1, cell[1]],
        [cell[0] + 1, cell[1] - 1],
        [cell[0], cell[1] - 1]
    ];

    for (let cell of cells)
        if (checkIsIncludeArray(body, cell)) count++;

    return count !== 2 && count !== 3;
}

//определяет все пустые клетки, находящиеся рядом с body
function getAllEmptyCellsNearBody(body) {
    const result = [];

    for (let cell of body) {
        const emptyCells = [
            [cell[0] - 1, cell[1] - 1],
            [cell[0] - 1, cell[1]],
            [cell[0] - 1, cell[1] + 1],
            [cell[0], cell[1] + 1],
            [cell[0] + 1, cell[1] + 1],
            [cell[0] + 1, cell[1]],
            [cell[0] + 1, cell[1] - 1],
            [cell[0], cell[1] - 1]
        ];

        for (let cell of emptyCells) {
            if (!checkIsIncludeArray(body, cell) && !checkIsIncludeArray(result, cell))
                result.push(cell);
        }
    }

    return result;
}

//определяет входит ли клетка(arr2) в body(arr1)
function checkIsIncludeArray(arr1, arr2) {
    for (let i of arr1)
        if (checkIsCopy(i, arr2)) return true;

    return false;
}

//удаляет из body(arr1) клетку(arr2), при условии что эта клетка входит в состав body
function excludeArray(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++)
        if (checkIsCopy(arr1[i], arr2)) arr1.splice(i, 1);

    return false;
}

//проверяет равна ли одна клетка другой
function checkIsCopy(src1, src2) {
    if (typeof src1 === "number" && typeof src2 === "number")
        return src1 === src2;

    if (Array.isArray(src1) && Array.isArray(src2))
        return src1.every((n, i) => checkIsCopy(n, src2[i]));
}

//создает поле с заданными шириной/высотоий и размером клетки
function createField(width, height, sizeCell) {
    const field = [];

    for (let y = 0; y < height; y++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let x = 0; x < width; x++) {
            const cell = document.createElement("div");
            cell.style.width = sizeCell + "px";
            cell.style.height = sizeCell + "px";

            cell.classList.add("cell");
            cell.setAttribute("data-cell", `${y},${x}`);

            row.append(cell);
        }

        field.push(row);
    }

    return field;
}

//делает поле замкнутым
function infiniteField(cell, width, height) {
    cell = cell.map((n, i) => {
        if (i === 0 && n === height) return 0;
        if (i === 1 && n === width) return 0;
        if (i === 0 && n === -1) return height - 1;
        if (i === 1 && n === -1) return width - 1;
        return n;
    })

    return cell;
}

//создает кнопку управления
function createButton(text, enabled) {
    const btn = document.createElement("button");

    btn.classList.add("btn");
    btn.innerHTML = text;
    btn.setAttribute("type", "button");
    btn.disabled = !enabled;

    return btn;
}

//создает нового жителя, состоящего из n клеток
function randomBody(width, height, n) {
    const body = [];
    const cell = [random(4, width - 4), random(4, height - 4)];

    body.push(cell);

    for (let i = 0; i < n - 1; i++) {
        while(true) {
            const cell = [random(4, width - 4), random(4, height - 4)];

            if (checkIsIncludeArray(getAllEmptyCellsNearBody(body), cell)) {
                body.push(cell);
                break;
            }
        }
    }

    return body;
}

function random(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}