window.addEventListener("load", dragdrop);

function dragdrop() {
    const initPos = {};
    const pointPos = {};
    let mousedown = false;
    let curImg;
    let zIndex = 0;

    const images = document.querySelectorAll("img");

    for (let img of images) {
        img.initX1 = img.offsetLeft;
        img.initY1 = img.offsetTop;
    }

    for (let img of images) {
        img.style.position = "absolute";
        img.style.left = img.initX1 + "px";
        img.style.top = img.initY1 + "px";
    }

    document.addEventListener("mousedown", (e) => {
        if (e.button === 0 && e.target.tagName === "IMG") {
            e.preventDefault();
            const img = e.target;

            curImg = img;
            pointPos.x = e.pageX - img.offsetLeft;
            pointPos.y = e.pageY - img.offsetTop;
            initPos.x1 = img.initX1;
            initPos.y1 = img.initY1;
            mousedown = true;
            img.style.cursor = "grab";
            curImg.style.zIndex = ++zIndex + "";
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (mousedown) {
            e.preventDefault();
            const x2 = e.pageX;
            const y2 = e.pageY;

            curImg.style.left = x2 - pointPos.x + "px";
            curImg.style.top = y2 - pointPos.y + "px";
        }
    });

    document.addEventListener("mouseup", (e) => {
        if (e.button === 0 && mousedown === true) {
            e.preventDefault();

            mousedown = false;
            curImg.style.cursor = "default";
        }
    });
}