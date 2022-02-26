const fieldWidth = 600; // ширина поля
const fieldHeight = 400; // высота поля
const racketMove = 20; // смещение ракетки при нажатии кливиш управления
const button = document.querySelector(".button");
const result = document.querySelector(".result");
const field = document.querySelector(".field");
const ballElem = document.querySelector(".ball");
const racketElem_1 = document.querySelector(".racket-1");
const racketElem_2 = document.querySelector(".racket-2");

const racket_1 = {
    posY: fieldHeight / 2 - racketElem_1.offsetHeight / 2,

    update() {
        racketElem_1.style.top = this.posY + "px";
    }
};

const racket_2 = {
    posY: fieldHeight / 2 - racketElem_2.offsetHeight / 2,

    update() {
        racketElem_2.style.top = this.posY + "px";
    }
};

const ball = {
    posX: fieldWidth / 2 - ballElem.offsetWidth / 2,
    posY: fieldHeight / 2 - ballElem.offsetHeight / 2,
    width: ballElem.offsetWidth,
    height: ballElem.offsetHeight,
    speedX: 3,
    speedY: null,

    update() {
        ballElem.style.left = this.posX + "px";
        ballElem.style.top = this.posY + "px";
    }
};

field.style.width = fieldWidth + "px";
field.style.height = fieldHeight + "px";

ball.update();
racket_1.update();
racket_2.update();
document.addEventListener("keydown", moveRacket);
button.addEventListener("click", start);

function start() {
    const m = (fieldHeight - ballElem.offsetHeight / 2) * ball.speedX * 10 / fieldWidth;

    button.removeEventListener("click", start);
    button.blur();
    ball.posX = fieldWidth / 2 - ballElem.offsetWidth / 2;
    ball.posY = fieldHeight / 2 - ballElem.offsetHeight / 2;
    ball.update();

    ball.speedY = random(0, m) / 10; // скорость по оси Y - случайное число от 0 до m

    if (Math.random() < 0.5) {
        ball.speedX = -ball.speedX;
        ball.speedY = -ball.speedY;
    }

    tick();
}

// изменяет позицию мячика
function tick() {
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    // если мячик попадает в ракетку 2
    if (ball.posX + ball.width > fieldWidth - racketElem_2.offsetWidth &&
        ball.posY + ball.height / 2 > racketElem_2.offsetTop &&
        ball.posY + ball.height / 2 < racketElem_2.offsetTop + racketElem_2.offsetHeight) {

        ball.speedX = -ball.speedX;
        ball.posX = fieldWidth - ball.width - racketElem_2.offsetWidth;
    }

    // если мячик попадает в ракетку 1
    if (ball.posX < racketElem_1.offsetWidth &&
        ball.posY + ball.height / 2 > racketElem_1.offsetTop &&
        ball.posY + ball.height / 2 < racketElem_1.offsetTop + racketElem_1.offsetHeight) {

        ball.speedX = -ball.speedX;
        ball.posX = racketElem_1.offsetWidth;
    }

    // если мячик попадает в правую границу поля
    if (ball.posX + ball.width > fieldWidth) {
        ball.posX = fieldWidth - ball.width;
        result.innerHTML = updateResult(1);
        button.addEventListener("click", start);
        ball.update();
        return;
    }

    // если мячик попадает в левую границу поля
    if (ball.posX < 0) {
        ball.posX = 0;
        result.innerHTML = updateResult(0);
        button.addEventListener("click", start);
        ball.update();
        return;
    }

    // если мячик попадает в левую нижнюю поля
    if (ball.posY + ball.height > fieldHeight) {
        ball.speedY = -ball.speedY;
        ball.posY = fieldHeight - ball.height;
    }

    // если мячик попадает в верхнюю нижнюю поля
    if (ball.posY < 0) {
        ball.speedY = -ball.speedY;
        ball.posY = 0;
    }

    ball.update();
    setTimeout(tick, 20);
}

// изменяет позицию ракеток по оси Y при нажатии клавиш shift, ctrl, ↑, ↓
function moveRacket(e) {

    if (e.key === "Shift") {
        racket_1.posY -= racketMove;

        if (racket_1.posY < 0)
            racket_1.posY = 0;

        racket_1.update();
    }

    if (e.key === "Control") {
        racket_1.posY += racketMove;

        if (racket_1.posY + racketElem_1.offsetHeight > fieldHeight)
            racket_1.posY = fieldHeight - racketElem_1.offsetHeight;

        racket_1.update();
    }

    if (e.key === "ArrowUp") {
        racket_2.posY -= racketMove;

        if (racket_2.posY < 0)
            racket_2.posY = 0;

        racket_2.update();
    }

    if (e.key === "ArrowDown") {
        racket_2.posY += racketMove;

        if (racket_2.posY + racketElem_2.offsetHeight > fieldHeight)
            racket_2.posY = fieldHeight - racketElem_2.offsetHeight;

        racket_2.update();
    }
}

// создает строку с обновленным результатом
function updateResult(n) {
    const res = result.innerHTML.split(":");
    res[n]++;
    return res.join(":");
}

// возвращает случайное целое число от n до m
function random(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}