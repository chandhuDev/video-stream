require("dotenv").config()
const app=require("./index.js")
const PORT=process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`sucessfully server is listening at PORT ${PORT}`)
})