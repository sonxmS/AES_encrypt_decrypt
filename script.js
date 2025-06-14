

async function getEncryptedval() {
    const value = document.getElementById("encrypt").value;
    const errorBox = document.getElementById("error-encrypt");
    const resultBox = document.getElementById("result-encrypt");
    resultBox.textContent = "";
    errorBox.textContent = "";
    let jsonData;
    try {
        jsonData = JSON.parse(value);  
    } catch (err) {
        errorBox.textContent = "Invalid JSON format!";
        return;
    }

    try {
        const data = await fetch("http://localhost:3000/encrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });
        if (!data.ok) {
            const output = await data.json();
            errorBox.textContent = output.error;
        }
        else {
            const encryptedVal = await data.json();
            resultBox.innerHTML = encryptedVal.encrypted;
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
        const response = await fetch("http://localhost:3000/decrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ encrypted: value }) 
        });
        if (!response.ok) {
            const output = await response.text();
            errorBox.textContent = "Provide valid encrypted characters!";
        }

        else {
            const decryptObj = await response.json();
            const result = decryptObj.decrypted;
            resultBox.textContent = JSON.stringify(result,null,2);
        }
    } catch (error) {
        console.log(error)
        errorBox.textContent = "Something wrong,please try later"
    }
}



