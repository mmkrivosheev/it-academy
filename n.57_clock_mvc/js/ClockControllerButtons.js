class ClockControllerButtons {

    constructor() {
        this.clockModal = null;
    }

    start(modal) {
        this.clockModal = modal;
    }

    addListener() {
        const elem = document.querySelector(this.clockModal.className);
        const btnStop = elem.querySelector(".btn-stop");
        const btnStart = elem.querySelector(".btn-start");

        btnStop.addEventListener("click", () => {
            this.clockModal.changeIsStop(true);
        });

        btnStart.addEventListener("click", () => {
            this.clockModal.changeIsStop(false);
        });
    }
}