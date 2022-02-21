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
    const shiftWatch = - (diameter / 5); //смещение электронных часов от центра циферблата
    const secondHandHeight = diameter / 2.1; //длина секундной стрелки
    const secondHandWidth = diameter / 100; //толщина секундной стрелки
    const roundingHandWidth = 0.4; //коэффициент скругления секундной стрелки
    const secondHandTurn = 6; //угол поворота секундной стрелки на каждую секунду (не менять!)
    const shiftSecondHand  = 95; //смещение оси вращения секундрой стрелки
    const minuteHandHeight = diameter / 2.6; //длина минутной стрелки
    const minuteHandWidth = diameter / 50; //толщина минутной стрелки
    const roundingMinuteHand = 0.4; //коэффициент скругления минутной стрелки
    const minuteHandTurn = 6; //угол поворота минутной стрелки на каждую минуту (не менять!)
    const shiftMinuteHand  = 93; //смещение оси вращения минутной стрелки
    const hourHandHeight = diameter / 3.6; //длина часовой стрелки
    const hourHandWidth = diameter / 25; //толщина часовой стрелки
    const roundingHourHandWidth = 0.4; //коэффициент скругления часовой стрелки
    const hourHandTurn = 30; //угол поворота часовой стрелки на каждый час (не менять!)
    const hourHandTurnForMinute = 0.5; //угол поворота часовой стрелки на каждую минуту (не менять!)
    const shiftHourHand  = 90; //смещение оси вращения часовой стрелки
    const clock = document.querySelector(".clock");
    const dial = document.createElement("div");
    const watch = document.createElement("div");
    const secondHand = document.createElement("div");
    const minuteHand = document.createElement("div");
    const hourHand = document.createElement("div");
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

    dial.classList.add("dial");
    dial.style.width = diameter + "px";
    dial.style.height = diameter + "px";
    clock.prepend(dial);

    for (let i = 0; i < items; i++) {
        const item = document.createElement("div");

        item.innerHTML = (i || items) + "";
        item.classList.add("item");
        item.style.width = itemDiameter + "px";
        item.style.height = itemDiameter + "px";
        item.style.fontSize = itemFont + "px";
        clock.prepend(item);

        const angle = i * 2 / items * Math.PI;
        const dialX = dial.offsetLeft + dial.offsetWidth / 2;
        const dialY = dial.offsetTop + dial.offsetHeight / 2;
        const itemX = dialX + (diameter / 2 - itemDiameter / 1.5) * Math.sin(angle);
        const itemY = dialY - (diameter / 2 - itemDiameter / 1.5) * Math.cos(angle);

        item.style.left = Math.round(itemX - item.offsetWidth / 2) + "px";
        item.style.top = Math.round(itemY - item.offsetHeight / 2) + "px";
    }

    watch.classList.add("watch");
    watch.style.fontSize = watchFont + "px";
    watch.style.transform = "translateY(" + shiftWatch + "px)";
    arrows.push(watch);

    secondHand.classList.add("second-hand");
    secondHand.style.width = secondHandWidth + "px";
    secondHand.style.height = secondHandHeight + "px";
    secondHand.style.borderRadius = secondHandWidth * roundingHandWidth + "px";
    secondHand.style.transformOrigin = "50%" + shiftSecondHand + "%" + "0";
    secondHand.style.top = - secondHandHeight * shiftSecondHand / 100 + "px";
    arrows.push(secondHand);

    minuteHand.classList.add("minute-hand");
    minuteHand.style.width = minuteHandWidth + "px";
    minuteHand.style.height = minuteHandHeight + "px";
    minuteHand.style.borderRadius = minuteHandWidth * roundingMinuteHand + "px";
    minuteHand.style.transformOrigin = "50%" + shiftMinuteHand + "%" + "0";
    minuteHand.style.top = - minuteHandHeight * shiftMinuteHand / 100 + "px";
    arrows.push(minuteHand);

    hourHand.classList.add("hour-hand");
    hourHand.style.width = hourHandWidth + "px";
    hourHand.style.height = hourHandHeight + "px";
    hourHand.style.borderRadius = hourHandWidth * roundingHourHandWidth + "px";
    hourHand.style.transformOrigin = "50%" + shiftHourHand + "%" + "0";
    hourHand.style.top = - hourHandHeight * shiftHourHand / 100 + "px";
    arrows.push(hourHand);

    clock.append(...arrows);
    updateClock(data);
}

function updateClock(data) {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const m = 1000 - (date % 1000); //определяю "m" - количество миллисекунд до следующей секунды

    data.watch.innerHTML = formatDateTime(date) + "";
    data.secondHand.style.transform = "rotate(" + data.secondHandTurn * seconds + "deg)";
    data.minuteHand.style.transform = "rotate(" + data.minuteHandTurn * minutes + "deg)";
    data.hourHand.style.transform =
       "rotate(" + (data.hourHandTurn * hours + data.hourHandTurnForMinute * minutes) + "deg)";

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