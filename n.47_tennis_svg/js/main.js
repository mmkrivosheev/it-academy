const buttonWeight = 70; // ширина кнопки "старт"
const buttonHeight = 30; // высота кнопки "старт"
const buttonTextFontSize = 18; // размер шрифта кнопки "старт"
const fieldWidth = 600; // ширина поля
const fieldHeight = 400; // высота поля
const racketWidth = 10; // ширина ракетки
const racketHeight = 110; // высота ракетки
const racketSpeedY = 8; // скорость ракетки
const ballSize = 40; // диаметр мяча
const buttonSvg = document.querySelector(".button-svg");
const result = document.querySelector(".result");
const fieldSvg = document.querySelector(".field-svg");
const buttonBody = document.createElementNS("http://www.w3.org/2000/svg","rect");
const buttonText = document.createElementNS("http://www.w3.org/2000/svg",'text');
const fieldBody = document.createElementNS("http://www.w3.org/2000/svg","rect");
const racket_1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
const racket_2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
const ball = document.createElementNS("http://www.w3.org/2000/svg","circle");

// создаю кнопку "старт"
buttonSvg.setAttribute("width", buttonWeight);
buttonSvg.setAttribute("height", buttonHeight);

buttonBody.classList.add("button-body");
buttonBody.setAttribute("x", 0);
buttonBody.setAttribute("y", 0);
buttonBody.setAttribute("width", buttonWeight);
buttonBody.setAttribute("height", buttonHeight);

buttonText.classList.add("button-text");
buttonText.style.fontSize = buttonTextFontSize + "px";
buttonText.setAttribute("x", buttonWeight / 2);
buttonText.setAttribute("y", buttonHeight / 2 + buttonTextFontSize / 4);
buttonText.innerHTML = "старт!";

buttonSvg.append(buttonBody, buttonText);

// создаю поле, ракетки и мяч
fieldSvg.setAttribute("width", fieldWidth);
fieldSvg.setAttribute("height", fieldHeight);

fieldBody.classList.add("field-body");
fieldBody.setAttribute("x", 0);
fieldBody.setAttribute("width", fieldWidth);
fieldBody.setAttribute("height", fieldHeight);

racket_1.classList.add("racket-1");
racket_1.setAttribute("x", 0);
racket_1.setAttribute("width", racketWidth);
racket_1.setAttribute("height", racketHeight);

racket_2.classList.add("racket-2");
racket_2.setAttribute("x", fieldWidth - racketWidth);
racket_2.setAttribute("width", racketWidth);
racket_2.setAttribute("height", racketHeight);

ball.classList.add("ball");
ball.setAttribute("r", ballSize / 2);

fieldSvg.append(fieldBody, racket_1, racket_2, ball);

const racket_1_Obj = {
    posY: fieldHeight / 2 - racketHeight / 2,
    speedY: 0,

    update() {
           racket_1.setAttribute("transform", "translate(0 " + this.posY + ")");
    }
};

const racket_2_Obj = {
    posY: fieldHeight / 2 - racketHeight / 2,
    speedY: 0,

    update() {
        racket_2.setAttribute("transform", "translate(0 " + this.posY + ")");
    }
};

const ballObj = {
    posX: fieldWidth / 2,
    posY: fieldHeight / 2,
    size: ballSize,
    speedX: 0,
    speedY: 0,

    update() {
        ball.setAttribute("transform", "translate(" + this.posX + " " + this.posY + ")");
    }
};

racket_1_Obj.update();
racket_2_Obj.update();
ballObj.update();
tick();
buttonSvg.addEventListener("click", start);

function start(e) {
    e.preventDefault();
    document.addEventListener("keydown", movesRacket);
    document.addEventListener("keyup", stopMovesRacket);
    buttonSvg.removeEventListener("click", start);
    ballObj.posX = fieldWidth / 2;
    ballObj.posY = fieldHeight / 2;
    ballObj.update();

    // задаю скорость мячику по оси X и Y
    ballObj.speedX = 3;
    const m = (fieldHeight - ballObj.size / 2) * ballObj.speedX * 10 / fieldWidth;
    ballObj.speedY = random(0, m) / 10;

    // мячик в случайном направлении
    if (Math.random() < 0.5) {
        ballObj.speedX = -ballObj.speedX;
        ballObj.speedY = -ballObj.speedY;
    }
}

// изменяет позицию ракеток и мячика
function tick() {
    racket_1_Obj.posY += racket_1_Obj.speedY;
    racket_2_Obj.posY += racket_2_Obj.speedY;
    ballObj.posX += ballObj.speedX;
    ballObj.posY += ballObj.speedY;

    // если ракетка 1 уперлась в верхнюю границу поля
    if (racket_1_Obj.posY < 0)
        racket_1_Obj.posY = 0;

    // если ракетка 1 уперлась в нижнюю границу поля
    if (racket_1_Obj.posY + racketHeight > fieldHeight)
        racket_1_Obj.posY = fieldHeight - racketHeight;

    // если ракетка 2 уперлась в верхнюю границу поля
    if (racket_2_Obj.posY < 0)
        racket_2_Obj.posY = 0;

    // если ракетка 2 уперлась в нижнюю границу поля
    if (racket_2_Obj.posY + racketHeight > fieldHeight)
        racket_2_Obj.posY = fieldHeight - racketHeight;

    // если мячик попадает в ракетку 2
    if (ballObj.posX + ballObj.size / 2 > fieldWidth - racketWidth &&
        ballObj.posY > racket_2_Obj.posY &&
        ballObj.posY < racket_2_Obj.posY + racketHeight) {

        ballObj.speedX = -ballObj.speedX;
        ballObj.posX = fieldWidth - ballObj.size / 2 - racketWidth;
    }

    // если мячик попадает в ракетку 1
    if (ballObj.posX  - ballObj.size / 2 < racketWidth &&
        ballObj.posY > racket_1_Obj.posY &&
        ballObj.posY < racket_1_Obj.posY + racketHeight) {

        ballObj.speedX = -ballObj.speedX;
        ballObj.posX = racketWidth + ballObj.size / 2;
    }

    // если мячик попадает в правую границу поля
    if (ballObj.posX + ballObj.size / 2 > fieldWidth) {
        ballObj.posX = fieldWidth - ballObj.size / 2;
        ballObj.speedX = 0;
        ballObj.speedY = 0;
        racket_1_Obj.speedY = 0;
        racket_2_Obj.speedY = 0;
        ballObj.update();
        result.innerHTML = updateResult(1);
        document.removeEventListener("keydown", movesRacket);
        document.removeEventListener("keyup", stopMovesRacket);
        buttonSvg.addEventListener("click", start);
    }

    // если мячик попадает в левую границу поля
    if (ballObj.posX - ballObj.size / 2 < 0) {
        ballObj.posX = ballObj.size / 2;
        ballObj.speedX = 0;
        ballObj.speedY = 0;
        racket_1_Obj.speedY = 0;
        racket_2_Obj.speedY = 0;
        ballObj.update();
        result.innerHTML = updateResult(0);
        document.removeEventListener("keydown", movesRacket);
        document.removeEventListener("keyup", stopMovesRacket);
        buttonSvg.addEventListener("click", start);
    }

    // если мячик попадает в нижнюю границу поля
    if (ballObj.posY +  ballObj.size / 2 > fieldHeight) {
        ballObj.speedY = -ballObj.speedY;
        ballObj.posY = fieldHeight -  ballObj.size / 2;
    }

    // если мячик попадает в верхнюю границу поля
    if (ballObj.posY - ballObj.size / 2 < 0) {
        ballObj.speedY = -ballObj.speedY;
        ballObj.posY = ballObj.size / 2;
    }

    racket_1_Obj.update();
    racket_2_Obj.update();
    ballObj.update();
    setTimeout(tick, 20);
}

// добавляет скорость ракетам по оси Y
function movesRacket(e) {
    e.preventDefault();

    if (e.key === "Shift")
        racket_1_Obj.speedY = -racketSpeedY;

    if (e.key === "Control")
        racket_1_Obj.speedY = racketSpeedY;

    if (e.key === "ArrowUp")
        racket_2_Obj.speedY = -racketSpeedY;

    if (e.key === "ArrowDown")
        racket_2_Obj.speedY = racketSpeedY;
}

// збрасывает на ноль скорость ракеток по оси Y
function stopMovesRacket(e) {
    e.preventDefault();

    if (e.key === "Shift" || e.key === "Control")
        racket_1_Obj.speedY = 0;

    if (e.key === "ArrowUp" || e.key === "ArrowDown")
        racket_2_Obj.speedY = 0;
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