const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express()
const PORT=process.env.port || 4000
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({message:"hello world"})
})

app.listen(PORT,()=>console.log(`Server is host on the port ${PORT}`))