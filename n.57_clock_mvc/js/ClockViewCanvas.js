class  ClockViewCanvas {
    diameter = 250;
    items = 12; //количесво цифр на циферблате (не менять!)
    dialColor  = "#fcca66"; //цвет циферблата
    itemDiameter = this.diameter / 7; //размер круга для цифры на циферблате
    itemColor  = "#48b382"; //цвет круга для цифры на циферблате
    itemFont = this.itemDiameter * 0.6; //размер цифры на циферблате
    watchFont = this.diameter / 15; //размер цифр для электронных часов на циферблате
    watchColor  = "#42484b"; //цвет электронных часов на циферблате
    shiftWatch = this.diameter / 5; //смещение электронных часов от центра циферблата
    secondHandHeight = this.diameter / 2.1; //длина секундной стрелки
    secondHandWidth = this.diameter / 100; //толщина секундной стрелки
    secondHandTurn = 6 * Math.PI / 180; //угол поворота секундной стрелки на каждую секунду (не менять!)
    shiftSecondHand  = this.diameter / 40; //смещение оси вращения секундрой стрелки
    minuteHandHeight = this.diameter / 2.6; //длина минутной стрелки
    minuteHandWidth = this.diameter / 50; //толщина минутной стрелки
    minuteHandTurn = 6 * Math.PI / 180; //угол поворота минутной стрелки на каждую минуту (не менять!)
    shiftMinuteHand  = this.diameter / 50; //смещение оси вращения минутной стрелки
    hourHandHeight = this.diameter / 3.6; //длина часовой стрелки
    hourHandWidth = this.diameter / 25; //толщина часовой стрелки
    hourHandTurn = 30 * Math.PI / 180; //угол поворота часовой стрелки на каждый час (не менять!)
    hourHandTurnForMinute = 0.5 * Math.PI / 180; //угол поворота часовой стрелки на каждую минуту (не менять!)
    shiftHourHand  = this.diameter / 90; //смещение оси вращения часовой стрелки
    strokeColor  = "#50595c"; //цвет обводки стрелок
    fillColor  = "#42484b"; //цвет заливки стрелок

    constructor() {
        this.clockModal = null;

    }

    start(modal) {
        this.clockModal = modal;
    }

    render() {
        const clockCvs = document.querySelector(this.clockModal.className + " .clock-cvs");
        const context = clockCvs.getContext('2d');
        const clockCvsX = this.diameter / 2;
        const clockCvsY = this.diameter / 2;
        const data = {
            s: this.strokeColor,
            f: this.fillColor,
            c: context,
            x: clockCvsX,
            y: clockCvsY
        }
        clockCvs.setAttribute("width", this.diameter);
        clockCvs.setAttribute("height", this.diameter);

        context.globalCompositeOperation = "source-over";
        context.beginPath();
        context.fillStyle = this.dialColor;
        context.arc(this.diameter / 2, this.diameter / 2, (this.diameter - 1) / 2, 0, Math.PI * 2, false);
        context.fill();

        for (let i = 0; i < this.items; i++) {
            const angle = i * 2 / this.items * Math.PI;
            const itemX = clockCvsX + (this.diameter / 2 - this.itemDiameter / 1.5) * Math.sin(angle);
            const itemY = clockCvsY - (this.diameter / 2 - this.itemDiameter / 1.5) * Math.cos(angle);

            context.globalCompositeOperation = "source-over";
            context.beginPath();
            context.fillStyle = this.itemColor;
            context.arc(itemX, itemY, this.itemDiameter / 2, 0, Math.PI * 2, false);
            context.fill();

            context.globalCompositeOperation = "source-over";
            context.fillStyle = this.fillColor;
            context.font = "normal " + this.itemFont + "px sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText((i || this.items) + "", itemX , itemY + this.itemDiameter / 20);
        }

        const date = this.clockModal.date;
        const hours = date.getHours();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();

        context.globalCompositeOperation = "source-over";
        context.fillStyle = this.watchColor;
        context.font = "normal " + this.watchFont + "px sans-serif";
        context.textAlign = "center";
        context.fillText(this.formatDateTime(date) + "", clockCvsX, clockCvsY - this.shiftWatch);

        context.save();
        context.translate(clockCvsX, clockCvsY)
        context.rotate(this.hourHandTurn * hours + this.hourHandTurnForMinute * minutes);
        context.translate(-clockCvsX, -clockCvsY);
        this.buildArrow(
            data,
            this.hourHandWidth,
            this.hourHandHeight,
            this.shiftHourHand
        );
        context.restore();

        context.save();
        context.translate(clockCvsX, clockCvsY)
        context.rotate(this.minuteHandTurn * minutes);
        context.translate(-clockCvsX, -clockCvsY);
        this.buildArrow(
            data,
            this.minuteHandWidth,
            this.minuteHandHeight,
            this.shiftMinuteHand
        );
        context.restore();

        context.save();
        context.translate(clockCvsX, clockCvsY)
        context.rotate(this.secondHandTurn * seconds);
        context.translate(-clockCvsX, -clockCvsY);
        this.buildArrow(
            data,
            this.secondHandWidth,
            this.secondHandHeight,
            this.shiftSecondHand
        );
        context.restore();
    }

    update() {
        this.render();
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

    buildArrow(data, w, h, s) {
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
}