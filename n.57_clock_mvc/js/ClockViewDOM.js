class  ClockViewDOM {
    diameter = 250;
    items = 12; //количесво цифр на циферблате (не менять!)
    itemDiameter = this.diameter / 7; //размер круга для цифры на циферблате
    itemFont = this.itemDiameter * 0.6; //размер цифры на циферблате
    watchFont = this.diameter / 15; //размер цифр для электронных часов на циферблате
    shiftWatch = - (this.diameter / 5); //смещение электронных часов от центра циферблата
    secondHandHeight = this.diameter / 2.1; //длина секундной стрелки
    secondHandWidth = this.diameter / 100; //толщина секундной стрелки
    roundingHandWidth = 0.4; //коэффициент скругления секундной стрелки
    secondHandTurn = 6; //угол поворота секундной стрелки на каждую секунду (не менять!)
    shiftSecondHand  = 95; //смещение оси вращения секундрой стрелки
    minuteHandHeight = this.diameter / 2.6; //длина минутной стрелки
    minuteHandWidth = this.diameter / 50; //толщина минутной стрелки
    roundingMinuteHand = 0.4; //коэффициент скругления минутной стрелки
    minuteHandTurn = 6; //угол поворота минутной стрелки на каждую минуту (не менять!)
    shiftMinuteHand  = 93; //смещение оси вращения минутной стрелки
    hourHandHeight = this.diameter / 3.6; //длина часовой стрелки
    hourHandWidth = this.diameter / 25; //толщина часовой стрелки
    roundingHourHandWidth = 0.4; //коэффициент скругления часовой стрелки
    hourHandTurn = 30; //угол поворота часовой стрелки на каждый час (не менять!)
    hourHandTurnForMinute = 0.5; //угол поворота часовой стрелки на каждую минуту (не менять!)
    shiftHourHand  = 90; //смещение оси вращения часовой стрелки
    dial = document.createElement("div");
    watch = document.createElement("div");
    secondHand = document.createElement("div");
    minuteHand = document.createElement("div");
    hourHand = document.createElement("div");

    constructor() {
        this.clockModal = null;

    }

    start(modal) {
        this.clockModal = modal;
    }

    render() {
        this.clock = document.querySelector(this.clockModal.className + " .clock-dom");
        const arrows = [];

        this.dial.classList.add("dial");
        this.dial.style.width = this.diameter + "px";
        this.dial.style.height = this.diameter + "px";
        this.clock.prepend(this.dial);

        for (let i = 0; i < this.items; i++) {
            const item = document.createElement("div");

            item.innerHTML = (i || this.items) + "";
            item.classList.add("item");
            item.style.width = this.itemDiameter + "px";
            item.style.height = this.itemDiameter + "px";
            item.style.fontSize = this.itemFont + "px";
            this.clock.prepend(item);

            const angle = i * 2 / this.items * Math.PI;
            const dialX = this.dial.offsetLeft + this.dial.offsetWidth / 2;
            const dialY = this.dial.offsetTop + this.dial.offsetHeight / 2;
            const itemX = dialX + (this.diameter / 2 - this.itemDiameter / 1.5) * Math.sin(angle);
            const itemY = dialY - (this.diameter / 2 - this.itemDiameter / 1.5) * Math.cos(angle);

            item.style.left = Math.round(itemX - item.offsetWidth / 2) + "px";
            item.style.top = Math.round(itemY - item.offsetHeight / 2) + "px";
        }

        this.watch.classList.add("watch");
        this.watch.style.fontSize = this.watchFont + "px";
        this.watch.style.transform = "translateY(" + this.shiftWatch + "px)";
        arrows.push(this.watch);

        this.secondHand.classList.add("second-hand");
        this.secondHand.style.width = this.secondHandWidth + "px";
        this.secondHand.style.height = this.secondHandHeight + "px";
        this.secondHand.style.borderRadius = this.secondHandWidth * this.roundingHandWidth + "px";
        this.secondHand.style.transformOrigin = "50%" + this.shiftSecondHand + "%" + "0";
        this.secondHand.style.top = - this.secondHandHeight * this.shiftSecondHand / 100 + "px";
        arrows.push(this.secondHand);

        this.minuteHand.classList.add("minute-hand");
        this.minuteHand.style.width = this.minuteHandWidth + "px";
        this.minuteHand.style.height = this.minuteHandHeight + "px";
        this.minuteHand.style.borderRadius = this.minuteHandWidth * this.roundingMinuteHand + "px";
        this.minuteHand.style.transformOrigin = "50%" + this.shiftMinuteHand + "%" + "0";
        this.minuteHand.style.top = - this.minuteHandHeight * this.shiftMinuteHand / 100 + "px";
        arrows.push(this.minuteHand);

        this.hourHand.classList.add("hour-hand");
        this.hourHand.style.width = this.hourHandWidth + "px";
        this.hourHand.style.height = this.hourHandHeight + "px";
        this.hourHand.style.borderRadius = this.hourHandWidth * this.roundingHourHandWidth + "px";
        this.hourHand.style.transformOrigin = "50%" + this.shiftHourHand + "%" + "0";
        this.hourHand.style.top = - this.hourHandHeight * this.shiftHourHand / 100 + "px";
        arrows.push(this.hourHand);

        this.clock.append(...arrows);
    }

    update() {
        const date = this.clockModal.date;
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();

        this.watch.innerHTML = this.formatDateTime(date) + "";
        this.secondHand.style.transform = "rotate(" + this.secondHandTurn * seconds + "deg)";
        this.minuteHand.style.transform = "rotate(" + this.minuteHandTurn * minutes + "deg)";
        this.hourHand.style.transform =
            "rotate(" + (this.hourHandTurn * hours + this.hourHandTurnForMinute * minutes) + "deg)";
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