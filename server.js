const express = require("express");
const app = express();
const cors = require('cors');
const { encryptSchema, decryptSchema } = require("./types")
app.use(cors());
app.use(express.json())


app.get("/encrypt",(req,res)=>{
    const text = encryptSchema.safeParse(req.query);
    try{
        if (!text.success) {
        return res.status(400).send(text.error.errors[0].message)
    }
    else{
        const response = text.data.encryptvalue;
        const result = "x"+response+"x"
        res.status(200).send(result)
    }
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Server error")
    }
})

app.get("/decrypt",(req,res)=>{
    const text = decryptSchema.safeParse(req.query);
    try{
    if (!text.success) {
        return res.status(400).send(text.error.errors[0].message);
    }
        const response = text.data.decryptvalue;
        const result = response.slice(1,response.length-1)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
app.listen(3000,()=>{
    console.log("server running on port 3000")
})
