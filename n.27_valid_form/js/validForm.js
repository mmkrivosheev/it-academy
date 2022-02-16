validForm();

function validForm() {
    const developer = form_1.elements["developer"];
    const siteName = form_1.elements["site-name"];
    const siteUrl = form_1.elements["site-url"];
    const startDate =form_1.elements["start-date"];
    const visitors = form_1.elements["visitors"];
    const email = form_1.elements["email"];
    const select = form_1.elements["division"];
    const radio = form_1.elements["payment"];
    const checkbox = form_1.elements["votes"];
    const textarea = form_1.elements["description"];
    const wrapper = form_1.querySelector(".wrapper");
    developer.focus();

    developer.addEventListener("blur", () => checkIsEmptyInput(developer));
    siteName.addEventListener("blur", () => checkIsEmptyInput(siteName));
    siteUrl.addEventListener("blur", () => checkIsUrl(siteUrl));
    startDate.addEventListener("blur", () => checkIsDate(startDate));
    visitors.addEventListener("blur", () => checkIsNan(visitors));
    email.addEventListener("blur", () => checkIsEmail(email));
    select.addEventListener("change", () => checkIsSelected(select));
    checkbox.addEventListener("change", () => checkCheckbox(checkbox));
    textarea.addEventListener("blur", () => checkIsEmptyInput(textarea));

    for (let i of radio) {
        i.addEventListener("click", () => {
            if (wrapper.classList.contains("error")) {
                wrapper.classList.remove("error");
                wrapper.lastChild.remove();
            }

            return false;
        });
    }

    form_1.addEventListener("submit", (e) => {
        try {
            const valid = [
                [checkIsEmptyInput, developer, siteName],
                [checkIsUrl, siteUrl],
                [checkIsDate, startDate],
                [checkIsNan, visitors],
                [checkIsEmail, email],
                [checkIsSelected, select],
                [checkRadio, radio],
                [checkCheckbox, checkbox],
                [checkIsEmptyInput, textarea],
            ];

            const count = [];

            valid.forEach(n => {
                n.forEach((m, i) => {
                    if (i > 0) {
                        const result = n[0](m);
                        if (count.length === 0 && result) {
                            e.preventDefault();
                            m !== radio ? count.push(m) : count.push(m[0]);
                        }
                    }
                });
            });

            if (count.length) {
                const elem = count[0];
                const type = elem.getAttribute("type");

                if (type === "radio" || type === "checkbox") elem.scrollIntoView();

                elem.focus();
            }

        } catch(error) {
            e.preventDefault();
            alert("Ошибка: " + error.message);
        }
    });
}

//проверяет чтобы поля были заполнены
function checkIsEmptyInput(elem) {

    if (!elem.value.trim()) {

        if (elem.classList.contains("error")) {
            const span = elem.parentElement.querySelector("span[class='text-error']");
            span.remove();
        }

        const span = document.createElement("span");
        elem.classList.add("error");
        span.classList.add("text-error");
        span.innerHTML = "поле должно быть заполнено";
        elem.after(span);
        return true;
    }


    elem.classList.remove("error");
    const span = elem.parentElement.querySelector("span[class='text-error']");
    if (span) span.remove();
    return false;
}

//проверяет чтобы значением был url
function checkIsUrl(elem) {
    const result = checkIsEmptyInput(elem);

    if (result) return result;
    else {
        if (!/^(http|https):\/\/.+\..+/.test(elem.value)) {
            const span = document.createElement("span");
            elem.classList.add("error");
            span.classList.add("text-error");
            span.innerHTML = "введите корректный url";
            elem.after(span);
            return true;
        }

        elem.classList.remove("error");
        const span = elem.parentElement.querySelector("span[class='text-error']");
        if (span) span.remove();
        return false;
    }
}
//проверяет чтобы указанная дата не была больше текущей
function checkIsDate(elem) {
    const result = checkIsEmptyInput(elem);

    if (result) return result;
    else {
        const fix = Date.parse(elem.value);
        const cur = +new Date();

        if (cur - fix < 0) {
            const span = document.createElement("span");
            elem.classList.add("error");
            span.classList.add("text-error");
            span.innerHTML = "дата не может быть больше текущей";
            elem.after(span);
            return true;
        }

        elem.classList.remove("error");
        const span = elem.parentElement.querySelector("span[class='text-error']");
        if (span) span.remove();
        return false;
    }
}

//проверяет чтобы значением было целое число
function checkIsNan(elem) {
    const result = checkIsEmptyInput(elem);

    if (result) return result;
    else {
       if (isNaN(elem.value.trim()) || +elem.value !== Math.floor(+elem.value)) {
           const span = document.createElement("span");
           elem.classList.add("error");
           span.classList.add("text-error");
           span.innerHTML = "значение должно быть целым числом";
           elem.after(span);
           return true;
       }

       elem.classList.remove("error");
       const span = elem.parentElement.querySelector("span[class='text-error']");
       if (span) span.remove();
       return false;
   }
}

//проверяет чтобы значением был email
function checkIsEmail(elem) {
    const result = checkIsEmptyInput(elem);

    if (result) return result;
    else {
        if (!/^[A-Za-z1-9_-]+@[A-Za-z]+\.[A-Za-z]+$/.test(elem.value)) {
            const span = document.createElement("span");
            elem.classList.add("error");
            span.classList.add("text-error");
            span.innerHTML = "введите корректный email";
            elem.after(span);
            return true;
        }

        elem.classList.remove("error");
        const span = elem.parentElement.querySelector("span[class='text-error']");
        if (span) span.remove();
        return false;
    }
}

//проверяет чтобы у select был выбран один из вариантов
function checkIsSelected(elem) {
        if (elem.value === "null") {

            if (elem.classList.contains("error")){
                const span = elem.parentElement.querySelector("span[class='text-error']");
                span.remove();
            }

            const span = document.createElement("span");
            elem.classList.add("error");
            span.classList.add("text-error");
            span.innerHTML = "виберите один из вариантов";
            elem.after(span);
            return true;
        }

        elem.classList.remove("error");
        const span = elem.parentElement.querySelector("span[class='text-error']");
        if (span) span.remove();
        return false;
}

//проверяет чтобы у radio-кнопок был выбран один из вариантов
function checkRadio(elems) {
    const wrapper = elems[0].parentElement.parentElement;

    if (wrapper.classList.contains("error")) return true;

    if (elems.value === "") {
        const span = document.createElement("span");
        wrapper.classList.add("error");
        span.classList.add("text-error");
        span.innerHTML = "необходимо выбрать один из пунктов";
        wrapper.append(span);
        return true;
    }
}

//проверяет чтобы был выбран checkbox
function checkCheckbox(elem) {
    if (!elem.checked) {

        if (elem.classList.contains("error")) {
            const span = elem.parentElement.querySelector("span[class='text-error']");
            span.remove();
        }

        const span = document.createElement("span");
        elem.classList.add("error");
        span.classList.add("text-error");
        span.innerHTML = "необходимо выбрать данный пункт";
        elem.after(span);
        return true;
    }

    elem.classList.remove("error");
    const span = elem.parentElement.querySelector("span[class='text-error']");
    if (span) span.remove();
    return false;
}