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
                    input.style.width = "350px";

                    div.append(label, input);
                    break;
                }

            case "date":
            {
                const label = document.createElement("label");
                const input = document.createElement("input");

                label.innerHTML = n.label;
                input.setAttribute("type", "date");
                input.setAttribute("name", n.name);
                input.style.width = "130px";

                div.append(label, input);
                break;
            }

            case "number":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "text");
                    input.setAttribute("name", n.name);
                    input.style.width = "130px";

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
                    const option = document.createElement("option");

                    label.innerHTML = n.label;
                    option.innerHTML = "=???????????????? ???? ????????????=";
                    option.setAttribute("value", "null");

                    select.setAttribute("name", n.name);
                    select.append(option);

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
                    const wrapper = document.createElement("span");
                    wrapper.classList.add("wrapper");
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
                        input.setAttribute("name", n.name);
                        input.setAttribute("value", m.value);

                        span.append(input, label);
                        wrapper.append(span);
                    }

                    div.append(wrapper);
                    break;
                }

            case "check":
                {
                    const label = document.createElement("label");
                    const input = document.createElement("input");

                    label.innerHTML = n.label;
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("name", n.name);

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
    {label:'????????????????????????:',kind:'longtext',name:'developer'},
    {label:'???????????????? ??????????:',kind:'longtext',name:'site-name'},
    {label:'URL ??????????:',kind:'longtext',name:'site-url'},
    {label:'???????? ?????????????? ??????????:',kind:'date',name:'start-date'},
    {label:'?????????????????????? ?? ??????????:',kind:'number',name:'visitors'},
    {label:'E-mail ?????? ??????????:',kind:'shorttext',name:'email'},
    {label:'?????????????? ????????????????:',kind:'combo',name:'division',
        variants:[{text:'????????????????',value:1},{text:'???????????????? ??????',value:2},{text:'?????????????? ??????????????',value:3}]},
    {label:'????????????????????:',kind:'radio',name:'payment',
        variants:[{text:'????????????????????',value:1},{text:'??????????????',value:2},{text:'VIP',value:3}]},
    {label:'?????????????????? ????????????:',kind:'check',name:'votes'},
    {label:'???????????????? ??????????:',kind:'memo',name:'description'},
    {caption:'????????????????????????',kind:'submit'},
];

const form_1 = document.forms["form-1"];
dynForm(form_1, formDef1);