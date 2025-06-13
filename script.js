// const { error } = require("console");

async function getEncryptedval() {
    const value = document.getElementById("encrypt").value;
    const errorBox = document.getElementById("error-encrypt");
    const resultBox = document.getElementById("result-encrypt");
    resultBox.textContent = "";
    errorBox.textContent = "";
    try {
        const data = await fetch(`http://localhost:3000/encrypt/?encryptvalue=${value}`)
        if (!data.ok) {
            const output = await data.text();
            errorBox.textContent = output;
        }
        else {
            const encryptedVal = await data.text();
            resultBox.innerHTML = encryptedVal;
        }
    } catch (error) {
        console.log(error)
        errorBox.textContent = "Oops!Something wrong from our side,please try later"
    }
}



function copyToClipboardEncrypted() {
    const textfield = document.getElementById("result-encrypt")
    const notifBox = document.getElementById("copy-notif-encrypt")
    const errorBox = document.getElementById("error-encrypt");

    if (!textfield.value) {
        errorBox.textContent = "Encrypt to copy!"
    }
    else {
        navigator.clipboard.writeText(textfield.value);
        notifBox.innerHTML = "Copied"
        notifBox.classList.add("visible")
        setTimeout(() => {
            notifBox.classList.remove("visible")
        }, 1000)
    }

}

function copyToClipboardDecrypted() {
    const textfield = document.getElementById("result-decrypt")
    const notifBox = document.getElementById("copy-notif-decrypt")
    const errorBox = document.getElementById("error-decrypt")
    if (!textfield.value) {
        errorBox.textContent = "Decrypt to copy!"
    }
    else {
        navigator.clipboard.writeText(textfield.value);
        notifBox.innerHTML = "Copied";
        notifBox.classList.add("visible")
        setTimeout(() => {
            notifBox.classList.remove("visible")
        }, 1000)
    }

}
async function getDecryptedVal() {
    const value = document.getElementById("decrypt").value;
    const errorBox = document.getElementById("error-decrypt");
    const resultBox = document.getElementById("result-decrypt");
    resultBox.textContent = "";
    errorBox.textContent = "";
    try {
        const response = await fetch(`http://localhost:3000/decrypt/?decryptvalue=${value}`)
        if (!response.ok) {
            const output = await response.text();
            errorBox.textContent = output;
        }
        else {
            const decryptval = await response.text();
            resultBox.innerHTML = decryptval;
        }
    } catch (error) {
        console.log(error)
        errorBox.textContent = "Something wrong,please try later"
    }
}