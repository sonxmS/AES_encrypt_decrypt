const zod = require("zod")

const encryptSchema = zod.object({
    encryptvalue : zod.string().min(1,"There must  be at least one character")
});

const decryptSchema = zod.object({
    decryptvalue : zod.string().min(3,"There must be at least 3 characters").refine(val => val.startsWith("x") && val.endsWith("x"),
    {message:"String must start and end with 'x'"})
})

module.exports={
    encryptSchema,
    decryptSchema
}