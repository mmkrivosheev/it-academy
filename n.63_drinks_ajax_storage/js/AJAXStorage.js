const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;

class AJAXStorageClass {
    constructor(storageName, lockInterface, onlockInterface) {
        this.storageName = storageName;
        this.lockInterface = lockInterface;
        this.onlockInterface = onlockInterface;
        this.storage = getData(this);
    }

    addValue(key, value) {
        this.storage[key] = value;
        updateData(this.storageName, this.storage);
    }

    getValue(key) {
        return this.storage[key];
    }

    deleteValue(key) {
        if (!(key in this.storage)) return false;
        delete this.storage[key];
        updateData(this.storageName, this.storage);
        return true;
    }

    getKeys() {
        return Object.keys(this.storage);
    }
}

function getData(obj) {
    obj.lockInterface();

    $.ajax({
        url: ajaxHandlerScript, type: "POST", cache: false,dataType: "json",
        data: { f: "READ", n: obj.storageName },
        success: readReady, error: errorHandler
    });

    function readReady(callResult) {
        if (callResult.error !== undefined)
            alert(callResult.error);
        else {
            obj.storage = (callResult.result !== "")
                ? JSON.parse(callResult.result)
                : {};
        }

        obj.onlockInterface();
    }
}

function updateData(storageName, storage) {
    updatePassword = Math.random();

    $.ajax({
        url: ajaxHandlerScript, type: "POST", cache: false,dataType: "json",
        data: { f: "LOCKGET", n: storageName, p: updatePassword },
        success: update, error: errorHandler
    });

    function update(callResult) {
        if (callResult.error !== undefined)
            alert(callResult.error);
        else {
            $.ajax({
                    url: ajaxHandlerScript, type: "POST", cache: false, dataType: "json",
                    data: {f: "UPDATE", n: storageName, v: JSON.stringify(storage), p: updatePassword},
                    success: updateReady,
                    error: errorHandler
                }
            );

            function updateReady(callResult) {
                if (callResult.error !== undefined)
                    alert(callResult.error);
            }
        }
    }
}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + " " + errorStr);
}