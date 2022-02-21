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
    const itemDiameter = diameter / 7; //размер круга для цифры на циферблате
    const itemFont = itemDiameter * 0.6; //размер цифры на циферблате
    const watchFont = diameter / 15; //размер цифр для электронных часов на циферблате
    const shiftWatch = diameter / 5; //смещение электронных часов от центра циферблата
    const secondHandHeight = diameter / 2.1; //длина секундной стрелки
    const secondHandWidth = diameter / 100; //толщина секундной стрелки
    const roundingSecondHand = diameter / 100; //коэффициент скругления секундной стрелки
    const secondHandTurn = 6; //угол поворота секундной стрелки на каждую секунду (не менять!)
    const shiftSecondHand  = diameter / 40; //смещение оси вращения секундрой стрелки
    const minuteHandHeight = diameter / 2.6; //длина минутной стрелки
    const minuteHandWidth = diameter / 50; //толщина минутной стрелки
    const roundingMinuteHand = diameter / 80; //коэффициент скругления минутной стрелки
    const minuteHandTurn = 6; //угол поворота минутной стрелки на каждую минуту (не менять!)
    const shiftMinuteHand  = diameter / 40; //смещение оси вращения минутной стрелки
    const hourHandHeight = diameter / 3.6; //длина часовой стрелки
    const hourHandWidth = diameter / 25; //толщина часовой стрелки
    const roundingHourHand = diameter / 60; //коэффициент скругления часовой стрелки
    const hourHandTurn = 30; //угол поворота часовой стрелки на каждый час (не менять!)
    const hourHandTurnForMinute = 0.5; //угол поворота часовой стрелки на каждую минуту (не менять!)
    const shiftHourHand  = diameter / 40; //смещение оси вращения часовой стрелки
    const clockSvg = document.querySelector(".clock-svg");
    const clockSvgX = diameter / 2;
    const clockSvgY = diameter / 2;
    const dial = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    const watch = document.createElementNS("http://www.w3.org/2000/svg",'text');
    const secondHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    const minuteHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    const hourHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    const arrows = [];
    const data = {
        secondHand,
        minuteHand,
        hourHand,
        watch,
        secondHandTurn,
        minuteHandTurn,
        hourHandTurn,
        hourHandTurnForMinute
    };

    clockSvg.setAttribute("width", diameter);
    clockSvg.setAttribute("height", diameter);

    dial.classList.add("dial");
    dial.setAttribute("r", diameter / 2);
    dial.setAttribute("cx", clockSvgX);
    dial.setAttribute("cy", clockSvgY);
    clockSvg.append(dial);

    for (let i = 0; i < items; i++) {
        const group = document.createElementNS("http://www.w3.org/2000/svg",'g');
        const itemCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        const itemText = document.createElementNS("http://www.w3.org/2000/svg",'text');
        const angle = i * 2 / items * Math.PI;
        const itemX = clockSvgX + (diameter / 2 - itemDiameter / 1.5) * Math.sin(angle);
        const itemY = clockSvgY - (diameter / 2 - itemDiameter / 1.5) * Math.cos(angle);

        itemCircle.classList.add("item-circle");
        itemCircle.setAttribute("r", itemDiameter / 2);
        itemCircle.setAttribute("cx", itemX);
        itemCircle.setAttribute("cy", itemY);

        itemText.classList.add("item-text");
        itemText.setAttribute("x", itemX);
        itemText.setAttribute("y", itemY + itemDiameter / 5);
        itemText.style.fontSize = itemFont + "px";
        itemText.textContent = (i || items) + "";

        group.append(itemCircle, itemText);
        clockSvg.append(group);
    }

    watch.classList.add("watch");
    watch.style.fontSize = watchFont + "px";
    watch.setAttribute("x", clockSvgX);
    watch.setAttribute("y", clockSvgY - shiftWatch);
    arrows.push(watch);

    hourHand.classList.add("hour-hand");
    hourHand.setAttribute("x", clockSvgX - hourHandWidth / 2);
    hourHand.setAttribute("y", clockSvgY + shiftHourHand - hourHandHeight);
    hourHand.setAttribute("width", hourHandWidth);
    hourHand.setAttribute("height", hourHandHeight);
    hourHand.setAttribute("rx", roundingHourHand);
    hourHand.setAttribute("ry", roundingHourHand);
    hourHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
    arrows.push(hourHand);

    minuteHand.classList.add("minute-hand");
    minuteHand.setAttribute("x", clockSvgX - minuteHandWidth / 2);
    minuteHand.setAttribute("y", clockSvgY + shiftMinuteHand - minuteHandHeight);
    minuteHand.setAttribute("width", minuteHandWidth);
    minuteHand.setAttribute("height", minuteHandHeight);
    minuteHand.setAttribute("rx", roundingMinuteHand);
    minuteHand.setAttribute("ry", roundingMinuteHand);
    minuteHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
    arrows.push(minuteHand);

    secondHand.classList.add("second-hand");
    secondHand.setAttribute("x", clockSvgX - secondHandWidth / 2);
    secondHand.setAttribute("y", clockSvgY + shiftSecondHand - secondHandHeight);
    secondHand.setAttribute("width", secondHandWidth);
    secondHand.setAttribute("height", secondHandHeight);
    secondHand.setAttribute("rx", roundingSecondHand);
    secondHand.setAttribute("ry", roundingSecondHand);
    secondHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
    arrows.push(secondHand);

    clockSvg.append(...arrows);
    updateClock(data);
}

function updateClock(data) {
    const date = new Date();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const m = 1000 - (date % 1000); //определяю "m" - количество миллисекунд до следующей секунды

    data.watch.innerHTML = formatDateTime(date) + "";
    data.secondHand.setAttribute("transform", "rotate(" + data.secondHandTurn * seconds + ")");
    data.minuteHand.setAttribute("transform", "rotate(" + data.minuteHandTurn * minutes + ")");
    data.hourHand.setAttribute(
        "transform", "rotate(" + (data.hourHandTurn * hours + data.hourHandTurnForMinute * minutes) + ")"
    );

    console.log(formatDateTime(date));
    setTimeout(updateClock, m, data); //указываю "m" в качестве задержки
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