window.addEventListener("load", dragdrop);

function dragdrop() {
    const pointPos = {};
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

            curImg.addEventListener("mousemove", getMove);
            curImg.style.zIndex = ++zIndex + "";
            img.style.cursor = "grab";
        }
    });

    document.addEventListener("mouseup", (e) => {
        if (e.button === 0) {
            e.preventDefault();

            curImg.removeEventListener("mousemove", getMove);
            curImg.style.cursor = "default";

        }
    });

    function getMove(e) {
        e.preventDefault();

        curImg.style.left = e.pageX - pointPos.x + "px";
        curImg.style.top = e.pageY - pointPos.y + "px";
    }
}