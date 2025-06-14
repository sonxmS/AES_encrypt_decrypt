const zod = require("zod")

const jsonObjectSchema = zod.record(zod.any())

module.exports={
    jsonObjectSchema
}