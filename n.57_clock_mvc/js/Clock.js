class Clock {

    constructor(className, timeZone) {
        this.clockView = null;
        this.className = className;
        this.timeZone = timeZone;
        this.date = new Date();
        this.isStop = false;
    }

    start(view) {
        this.clockView = view;
    }

    changeIsStop(boolean) {
        this.isStop = boolean;
    }

    buildClock() {
        this.clockView.render();
        this.updateClock();
    }

    updateClock() {
        let date = new Date();
        date = date.setHours(date.getHours() + this.timeZone);
        this.date = new Date(date);
        const m = 1000 - (this.date % 1000);
        if (!this.isStop) this.clockView.update();
        setTimeout(this.updateClock.bind(this), m);
    }
}