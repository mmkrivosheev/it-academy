const fieldWidth = 600; // ширина поля
const fieldHeight = 400; // высота поля
const fieldFillColor = "#f0ee7e"; // цвет заливки поля
const fieldStrokeColor = "#778899"; // цвет обводки поля
const racketWidth = 10; // ширина ракетки
const racketHeight = 110; // высота ракетки
const racketSpeedY = 8; // скорость ракетки
const racket_1_color = "#09aa57"; // цвет ракетки 1
const racket_2_color = "#191497"; // цвет ракетки 2
const ballSize = 40; // диаметр мячика
const ballColor = "#f02137"; // цвет мячика
const button = document.querySelector(".button");
const result = document.querySelector(".result");

const racket_1 = {
    posY: fieldHeight / 2 - racketHeight / 2,
    speedY: 0
};

const racket_2 = {
    posY: fieldHeight / 2 - racketHeight / 2,
    speedY: 0
};

const ball = {
    posX: fieldWidth / 2,
    posY: fieldHeight / 2,
    speedX: 0,
    speedY: 0,
    size: ballSize
};

tick();
button.addEventListener("click", start);

function start(e) {
    e.preventDefault();
    button.blur();
    document.addEventListener("keydown", movesRacket);
    document.addEventListener("keyup", stopMovesRacket);
    button.removeEventListener("click", start);
    ball.posX = fieldWidth / 2;
    ball.posY = fieldHeight / 2;

    // задаю скорость мячику по оси X и Y
    ball.speedX = 3;
    const m = (fieldHeight - ballSize / 2) * ball.speedX * 10 / fieldWidth;
    ball.speedY = random(0, m) / 10;

    // мячик в случайном направлении
    if (Math.random() < 0.5) {
        ball.speedX = -ball.speedX;
        ball.speedY = -ball.speedY;
    }
}

// изменяет позицию ракеток и мячика и отрисовывает их
function tick() {
    racket_1.posY += racket_1.speedY;
    racket_2.posY += racket_2.speedY;
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    // если ракетка 1 уперлась в верхнюю границу поля
    if (racket_1.posY < 0)
        racket_1.posY = 0;

    // если ракетка 1 уперлась в нижнюю границу поля
    if (racket_1.posY + racketHeight > fieldHeight)
        racket_1.posY = fieldHeight - racketHeight;

    // если ракетка 2 уперлась в верхнюю границу поля
    if (racket_2.posY < 0)
        racket_2.posY = 0;

    // если ракетка 2 уперлась в нижнюю границу поля
    if (racket_2.posY + racketHeight > fieldHeight)
        racket_2.posY = fieldHeight - racketHeight;

    // если мячик попадает в ракетку 2
    if (ball.posX + ballSize / 2 > fieldWidth - racketWidth &&
        ball.posY > racket_2.posY &&
        ball.posY < racket_2.posY + racketHeight) {

        ball.speedX = -ball.speedX;
        ball.posX = fieldWidth - ballSize / 2 - racketWidth;
    }

    // если мячик попадает в ракетку 1
    if (ball.posX - ballSize / 2 < racketWidth &&
        ball.posY > racket_1.posY &&
        ball.posY < racket_1.posY + racketHeight) {

        ball.speedX = -ball.speedX;
        ball.posX = racketWidth + ballSize / 2;
    }

    // если мячик попадает в правую границу поля
    if (ball.posX + ballSize / 2 > fieldWidth) {
        ball.posX = fieldWidth - ballSize / 2 - 1;
        ball.speedX = 0;
        ball.speedY = 0;
        racket_1.speedY = 0;
        racket_2.speedY = 0;
        result.innerHTML = updateResult(1);
        document.removeEventListener("keydown", movesRacket);
        document.removeEventListener("keyup", stopMovesRacket);
        button.addEventListener("click", start);
    }

    // если мячик попадает в левую границу поля
    if (ball.posX - ballSize / 2 < 0) {
        ball.posX = ballSize / 2 + 1;
        ball.speedX = 0;
        ball.speedY = 0;
        racket_1.speedY = 0;
        racket_2.speedY = 0;
        result.innerHTML = updateResult(0);
        document.removeEventListener("keydown", movesRacket);
        document.removeEventListener("keyup", stopMovesRacket);
        button.addEventListener("click", start);
    }

    // если мячик попадает в нижнюю границу поля
    if (ball.posY + ballSize / 2 > fieldHeight) {
        ball.speedY = -ball.speedY;
        ball.posY = fieldHeight - ballSize / 2 - 1;
    }

    // если мячик попадает в верхнюю границу поля
    if (ball.posY - ballSize / 2 < 0) {
        ball.speedY = -ball.speedY;
        ball.posY = ballSize / 2 + 1;
    }

    const fieldCvs = document.querySelector(".field-cvs");
    const context = fieldCvs.getContext('2d');

    fieldCvs.setAttribute("width", fieldWidth);
    fieldCvs.setAttribute("height", fieldHeight);

    // создаю поле
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = fieldStrokeColor;
    context.fillStyle = fieldFillColor;
    context.beginPath();
    context.moveTo(0.5, 0.5);
    context.lineTo(fieldWidth - 0.5, 0.5);
    context.lineTo(fieldWidth - 0.5, fieldHeight - 0.5);
    context.lineTo(0.5, fieldHeight - 0.5);
    context.lineTo(0.5, 0.5);
    context.stroke();
    context.fill();

    // рисую ракетку 1
    context.save();
    context.globalCompositeOperation = "source-over";
    context.fillStyle = racket_1_color;
    context.translate(0, racket_1.posY);
    context.fillRect(0.5, 0.5, racketWidth - 0.5, racketHeight - 0.5);
    context.restore();

    // рисую ракетку 2
    context.save();
    context.globalCompositeOperation = "source-over";
    context.fillStyle = racket_2_color;
    context.translate(0, racket_2.posY);
    context.fillRect(fieldWidth + 0.5 - racketWidth, 0.5 , racketWidth - 0.5, racketHeight - 0.5);
    context.restore();

    // рисую мячик
    context.save();
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.fillStyle = ballColor;
    context.translate(ball.posX, ball.posY);
    context.arc(0, 0, ballSize / 2, 0, Math.PI * 2, false);
    context.fill();
    context.restore();

    setTimeout(tick, 20);
}

// добавляет скорость ракетам по оси Y
function movesRacket(e) {
    e.preventDefault();

    if (e.key === "Shift")
        racket_1.speedY = -racketSpeedY;

    if (e.key === "Control")
        racket_1.speedY = racketSpeedY;

    if (e.key === "ArrowUp")
        racket_2.speedY = -racketSpeedY;

    if (e.key === "ArrowDown")
        racket_2.speedY = racketSpeedY;
}

// збрасывает на ноль скорость ракеток по оси Y
function stopMovesRacket(e) {
    e.preventDefault();

    if (e.key === "Shift" || e.key === "Control")
        racket_1.speedY = 0;

    if (e.key === "ArrowUp" || e.key === "ArrowDown")
        racket_2.speedY = 0;
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