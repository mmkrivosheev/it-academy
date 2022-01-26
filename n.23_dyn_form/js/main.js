function dynForm(form, data) {
    const result = [];

    for (let n of data) {
        const div = document.createElement("div");
        div.classList.add("item");

        switch (n.kind) {
            case "longtext":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "text");
                    input.setAttribute("name", n.name);
                    input.style.width = "400px";

                    div.append(label, input);
                    break;
                }

            case "number":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "number");
                    input.setAttribute("name", n.name);
                    input.style.width = "80px";

                    div.append(label, input);
                    break;
                }

            case "shorttext":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "text");
                    input.setAttribute("name", n.name);
                    input.style.width = "200px";

                    div.append(label, input);
                    break;
                }

            case "combo":
                {
                    const label = document.createElement("label");
                    const select = document.createElement("select");

                    label.innerHTML = n.label;
                    select.setAttribute("name", n.name);

                    for (let m of n.variants) {
                        const option = document.createElement("option");

                        option.innerHTML = m.text;
                        option.setAttribute("value", m.value);

                        select.append(option);
                    }

                    div.append(label, select);
                    break;
                }

            case "radio":
                {
                    const label = document.createElement("label");
                    label.innerHTML = n.label;
                    div.append(label);

                    for (let m of n.variants) {
                        const span = document.createElement("span");
                        const input = document.createElement("input");
                        const label = document.createElement("label");

                        label.innerHTML = m.text;
                        label.setAttribute("for", "label-" + m.value);
                        input.setAttribute("type", "radio");
                        input.setAttribute("id", "label-" + m.value);
                        input.setAttribute("name", "name");
                        input.setAttribute("value", m.value);

                        span.append(input, label);
                        div.append(span);
                    }

                    break;
                }

            case "check":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("name", n.name);
                    input.checked = true;

                    div.append(label, input);
                    break;
                }

            case "memo":
                {
                    const label = document.createElement("label");
                    const textarea = document.createElement("textarea");

                    label.innerHTML = n.label;
                    textarea.setAttribute("name", n.name);

                    div.append(label, textarea);
                    break;
                }

            case "submit":
                {
                    const btn = document.createElement("button");

                    btn.innerHTML = n.caption;
                    btn.setAttribute("type", "submit");

                    div.append(btn);
                }
        }

        result.push(div);
    }

    form.append(...result);
}

const formDef1 = [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
        variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
        variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {caption:'Опубликовать',kind:'submit'},
];

const formDef2 = [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {caption:'Зарегистрироваться',kind:'submit'},
];

const form_1 = document.forms["form-1"];
const form_2 = document.forms["form-2"];

dynForm(form_1, formDef1);
dynForm(form_2, formDef2);