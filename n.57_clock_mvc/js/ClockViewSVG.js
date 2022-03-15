class ClockViewSVG {
    diameter = 250;
    items = 12; //количесво цифр на циферблате (не менять!)
    itemDiameter = this.diameter / 7; //размер круга для цифры на циферблате
    itemFont = this.itemDiameter * 0.6; //размер цифры на циферблате
    watchFont = this.diameter / 15; //размер цифр для электронных часов на циферблате
    shiftWatch = this.diameter / 5; //смещение электронных часов от центра циферблата
    secondHandHeight = this.diameter / 2.1; //длина секундной стрелки
    secondHandWidth = this.diameter / 100; //толщина секундной стрелки
    roundingSecondHand = this.diameter / 100; //коэффициент скругления секундной стрелки
    secondHandTurn = 6; //угол поворота секундной стрелки на каждую секунду (не менять!)
    shiftSecondHand  = this.diameter / 40; //смещение оси вращения секундрой стрелки
    minuteHandHeight = this.diameter / 2.6; //длина минутной стрелки
    minuteHandWidth = this.diameter / 50; //толщина минутной стрелки
    roundingMinuteHand = this.diameter / 80; //коэффициент скругления минутной стрелки
    minuteHandTurn = 6; //угол поворота минутной стрелки на каждую минуту (не менять!)
    shiftMinuteHand  = this.diameter / 40; //смещение оси вращения минутной стрелки
    hourHandHeight = this.diameter / 3.6; //длина часовой стрелки
    hourHandWidth = this.diameter / 25; //толщина часовой стрелки
    roundingHourHand = this.diameter / 60; //коэффициент скругления часовой стрелки
    hourHandTurn = 30; //угол поворота часовой стрелки на каждый час (не менять!)
    hourHandTurnForMinute = 0.5; //угол поворота часовой стрелки на каждую минуту (не менять!)
    shiftHourHand  = this.diameter / 40; //смещение оси вращения часовой стрелки
    watch = document.createElementNS("http://www.w3.org/2000/svg",'text');
    secondHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    minuteHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    hourHand = document.createElementNS("http://www.w3.org/2000/svg",'rect');

    constructor() {
        this.clockModal = null;

    }

    start(modal) {
        this.clockModal = modal;
    }

    render() {
        const clockSvg = document.querySelector(this.clockModal.className + " .clock-svg");
        const dial = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        const clockSvgX = this.diameter / 2;
        const clockSvgY = this.diameter / 2;

        const arrows = [];

        clockSvg.setAttribute("width", this.diameter);
        clockSvg.setAttribute("height", this.diameter);

        dial.classList.add("dial");
        dial.setAttribute("r", this.diameter / 2);
        dial.setAttribute("cx", clockSvgX);
        dial.setAttribute("cy", clockSvgY);
        clockSvg.append(dial);

        for (let i = 0; i < this.items; i++) {
            const group = document.createElementNS("http://www.w3.org/2000/svg",'g');
            const itemCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
            const itemText = document.createElementNS("http://www.w3.org/2000/svg",'text');
            const angle = i * 2 / this.items * Math.PI;
            const itemX = clockSvgX + (this.diameter / 2 - this.itemDiameter / 1.5) * Math.sin(angle);
            const itemY = clockSvgY - (this.diameter / 2 - this.itemDiameter / 1.5) * Math.cos(angle);

            itemCircle.classList.add("item-circle");
            itemCircle.setAttribute("r", this.itemDiameter / 2);
            itemCircle.setAttribute("cx", itemX);
            itemCircle.setAttribute("cy", itemY);

            itemText.classList.add("item-text");
            itemText.setAttribute("x", itemX);
            itemText.setAttribute("y", itemY + this.itemDiameter / 5);
            itemText.style.fontSize = this.itemFont + "px";
            itemText.textContent = (i || this.items) + "";

            group.append(itemCircle, itemText);
            clockSvg.append(group);
        }

        this.watch.classList.add("watch");
        this.watch.style.fontSize = this.watchFont + "px";
        this.watch.setAttribute("x", clockSvgX);
        this.watch.setAttribute("y", clockSvgY - this.shiftWatch);
        arrows.push(this.watch);

        this.hourHand.classList.add("hour-hand");
        this.hourHand.setAttribute("x", clockSvgX - this.hourHandWidth / 2);
        this.hourHand.setAttribute("y", clockSvgY + this.shiftHourHand - this.hourHandHeight);
        this.hourHand.setAttribute("width", this.hourHandWidth);
        this.hourHand.setAttribute("height", this.hourHandHeight);
        this.hourHand.setAttribute("rx", this.roundingHourHand);
        this.hourHand.setAttribute("ry", this.roundingHourHand);
        this.hourHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
        arrows.push(this.hourHand);

        this.minuteHand.classList.add("minute-hand");
        this.minuteHand.setAttribute("x", clockSvgX - this.minuteHandWidth / 2);
        this.minuteHand.setAttribute("y", clockSvgY + this.shiftMinuteHand - this.minuteHandHeight);
        this.minuteHand.setAttribute("width", this.minuteHandWidth);
        this.minuteHand.setAttribute("height", this.minuteHandHeight);
        this.minuteHand.setAttribute("rx", this.roundingMinuteHand);
        this.minuteHand.setAttribute("ry", this.roundingMinuteHand);
        this.minuteHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
        arrows.push(this.minuteHand);

        this.secondHand.classList.add("second-hand");
        this.secondHand.setAttribute("x", clockSvgX - this.secondHandWidth / 2);
        this.secondHand.setAttribute("y", clockSvgY + this.shiftSecondHand - this.secondHandHeight);
        this.secondHand.setAttribute("width", this.secondHandWidth);
        this.secondHand.setAttribute("height", this.secondHandHeight);
        this.secondHand.setAttribute("rx", this.roundingSecondHand);
        this.secondHand.setAttribute("ry", this.roundingSecondHand);
        this.secondHand.style.transformOrigin = clockSvgX + "px" + " " + clockSvgY + "px" + " " + "0";
        arrows.push(this.secondHand);

        clockSvg.append(...arrows);
    }

    update() {
        const date = this.clockModal.date;
        const hours = date.getHours();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();

        this.watch.innerHTML = this.formatDateTime(date) + "";
        this.secondHand.setAttribute("transform", "rotate(" + this.secondHandTurn * seconds + ")");
        this.minuteHand.setAttribute("transform", "rotate(" + this.minuteHandTurn * minutes + ")");
        this.hourHand.setAttribute(
            "transform", "rotate(" + (this.hourHandTurn * hours + this.hourHandTurnForMinute * minutes) + ")"
        );
    }

    formatDateTime(dt) {
        const hours = dt.getHours();
        const minutes = dt.getMinutes();
        const seconds = dt.getSeconds();

        return this.str0l(this.str0l(hours, 2) + ':' + this.str0l(minutes, 2) + ':' + this.str0l(seconds, 2));
    }

    str0l(val, len) {
        let strVal = val.toString();

        while (strVal.length < len)
            strVal = '0' + strVal;

        return strVal;
    }
}