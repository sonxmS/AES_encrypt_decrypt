const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const { jsonObjectSchema } = require("./types")
app.use(express.json())
app.use(cors());
const { decrypt } = require("dotenv");
const secretKey = Buffer.from(process.env.SECRET_KEY, "base64");
const iv = Buffer.from(process.env.IV, "base64");
const algorithm = 'aes-256-cbc';

app.post("/encrypt", (req, res) => {

    const response = jsonObjectSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).send(text.error.errors[0].message)        
    }
    try {
        const data = response.data
        const encrypted = encryptAES(data);
        res.status(200).json({ encrypted });
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Server error")
    }
})

app.post("/decrypt", (req, res) => {
    try {
        const encryptedText = req.body.encrypted;
        const decryptedObj = decryptAES(encryptedText);
        res.status(200).json({ decrypted: decryptedObj });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Decryption failed", details: err.message });
    }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function encryptAES(dataObj) {
    const cipher =  crypto.createCipheriv("aes-256-cbc", secretKey, iv);

    const jsonStr = JSON.stringify(dataObj);
    let encrypted =  cipher.update(jsonStr, "utf8", "base64");
    encrypted +=  cipher.final("base64");

    return encrypted;
}

function decryptAES(encryptedStr) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

    let decrypted = decipher.update(encryptedStr, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
}