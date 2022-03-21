const forms = document.forms;
const addresses = [
    "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json",
    "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json",
];

getFormDataAndBuildDynForm(addresses);

function getFormDataAndBuildDynForm(addresses) {
    let currIndex = 0;
    let formData = [];

    function getNextFormData() {
        if (currIndex < addresses.length) {
            $.ajax(
                addresses[currIndex],
                {
                    type: "GET",
                    dataType: "json",
                    success: function(data) {
                        formData[currIndex++] = data;
                        getNextFormData();
                    },
                    error: errorHandler
                }
            );
            return;
        }
        for (let i = 0; i < forms.length; i++)
            dynForm(forms[i], formData[i]);
    }

    getNextFormData();
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr + ' ' + errorStr);
}