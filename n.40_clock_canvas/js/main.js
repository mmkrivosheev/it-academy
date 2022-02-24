const showClock = document.querySelector(".show-clock");
const input = document.querySelector(".input");
const error = document.querySelector(".error");
const button = document.querySelector(".button");

button.addEventListener("click", () => {
    const value = +input.value.trim();

    if (value >= 200 && value <= 800) {
        showClock.style.display = "none";
        buildClock(value);
    } else {
        input.focus();
        error.innerHTML = "введите число в диапазоне";
    }
});

function buildClock(diameter) {
    const items = 12; //количесво цифр на циферблате (не менять!)
    const dialColor  = "#fcca66"; //цвет циферблата
    const itemDiameter = diameter / 7; //размер круга для цифры на циферблате
    const itemColor  = "#48b382"; //цвет круга для цифры на циферблате
    const itemFont = itemDiameter * 0.6; //размер цифры на циферблате
    const watchFont = diameter / 15; //размер цифр для электронных часов на циферблате
    const watchColor  = "#42484b"; //цвет электронных часов на циферблате
    const shiftWatch = diameter / 5; //смещение электронных часов от центра циферблата
    const secondHandHeight = diameter / 2.1; //длина секундной стрелки
    const secondHandWidth = diameter / 100; //толщина секундной стрелки
    const secondHandTurn = 6 * Math.PI / 180; //угол поворота секундной стрелки на каждую секунду (не менять!)
    const shiftSecondHand  = diameter / 40; //смещение оси вращения секундрой стрелки
    const minuteHandHeight = diameter / 2.6; //длина минутной стрелки
    const minuteHandWidth = diameter / 50; //толщина минутной стрелки
    const minuteHandTurn = 6 * Math.PI / 180; //угол поворота минутной стрелки на каждую минуту (не менять!)
    const shiftMinuteHand  = diameter / 50; //смещение оси вращения минутной стрелки
    const hourHandHeight = diameter / 3.6; //длина часовой стрелки
    const hourHandWidth = diameter / 25; //толщина часовой стрелки
    const hourHandTurn = 30 * Math.PI / 180; //угол поворота часовой стрелки на каждый час (не менять!)
    const hourHandTurnForMinute = 0.5 * Math.PI / 180; //угол поворота часовой стрелки на каждую минуту (не менять!)
    const shiftHourHand  = diameter / 90; //смещение оси вращения часовой стрелки
    const strokeColor  = "#50595c"; //цвет обводки стрелок
    const fillColor  = "#42484b"; //цвет заливки стрелок
    const clockCvs = document.querySelector(".clock-cvs");
    const context = clockCvs.getContext('2d');
    const clockCvsX = diameter / 2;
    const clockCvsY = diameter / 2;
    const data = {
        s: strokeColor,
        f: fillColor,
        c: context,
        x: clockCvsX,
        y: clockCvsY
    }

    clockCvs.setAttribute("width", diameter);
    clockCvs.setAttribute("height", diameter);

    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.fillStyle = dialColor;
    context.arc(diameter / 2, diameter / 2, (diameter - 1) / 2, 0, Math.PI * 2, false);
    context.fill();

    for (let i = 0; i < items; i++) {
        const angle = i * 2 / items * Math.PI;
        const itemX = clockCvsX + (diameter / 2 - itemDiameter / 1.5) * Math.sin(angle);
        const itemY = clockCvsY - (diameter / 2 - itemDiameter / 1.5) * Math.cos(angle);

        context.globalCompositeOperation = "source-over";
        context.beginPath();
        context.fillStyle = itemColor;
        context.arc(itemX, itemY, itemDiameter / 2, 0, Math.PI * 2, false);
        context.fill();

        context.globalCompositeOperation = "source-over";
        context.fillStyle = fillColor;
        context.font = "normal " + itemFont + "px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText((i || items) + "", itemX , itemY + itemDiameter / 20);
    }

    const date = new Date();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const m = 1000 - (date % 1000); //определяю "m" - количество миллисекунд до следующей секунды

    context.globalCompositeOperation = "source-over";
    context.fillStyle = watchColor;
    context.font = "normal " + watchFont + "px sans-serif";
    context.textAlign = "center";
    context.fillText(formatDateTime(date) + "", clockCvsX, clockCvsY - shiftWatch);

    context.save();
    context.translate(clockCvsX, clockCvsY)
    context.rotate(hourHandTurn * hours + hourHandTurnForMinute * minutes);
    context.translate(-clockCvsX, -clockCvsY);
    buildArrow(
        data,
        hourHandWidth,
        hourHandHeight,
        shiftHourHand
    );
    context.restore();

    context.save();
    context.translate(clockCvsX, clockCvsY)
    context.rotate(minuteHandTurn * minutes);
    context.translate(-clockCvsX, -clockCvsY);
    buildArrow(
        data,
        minuteHandWidth,
        minuteHandHeight,
        shiftMinuteHand
    );
    context.restore();

    context.save();
    context.translate(clockCvsX, clockCvsY)
    context.rotate(secondHandTurn * seconds);
    context.translate(-clockCvsX, -clockCvsY);
    buildArrow(
        data,
        secondHandWidth,
        secondHandHeight,
        shiftSecondHand
    );
    context.restore();

    setTimeout(buildClock, m, diameter); //указываю "m" в качестве задержки
}

function formatDateTime(dt) {
    const hours = dt.getHours();
    const minutes = dt.getMinutes();
    const seconds = dt.getSeconds();

    return str0l(str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2));
}

function str0l(val, len) {
    let strVal = val.toString();

    while (strVal.length < len)
        strVal = '0' + strVal;

    return strVal;
}

function buildArrow(data, w, h, s) { //data, разм стрелки, смещ стрелки
    data.c.globalCompositeOperation = "source-over";
    data.c.strokeStyle = data.s;
    data.c.fillStyle = data.f;
    data.c.beginPath();
    data.c.moveTo(data.x - w / 2, data.y + s);
    data.c.lineTo(data.x - w / 2, data.y + s - h + w / 2);
    data.c.arcTo(data.x - w / 2, data.y + s - h, data.x, data.y + s - h, w / 2);
    data.c.arcTo(data.x + w / 2, data.y + s - h, data.x + w / 2, data.y, w / 2);
    data.c.lineTo(data.x + w / 2, data.y + s - w / 2);
    data.c.arcTo(data.x + w / 2, data.y + s + w / 2, data.x, data.y + s + w / 2, w / 2);
    data.c.arcTo(data.x - w / 2, data.y + s + w / 2, data.x - w / 2, data.y, w / 2);
    data.c.stroke();
    data.c.fill();
}