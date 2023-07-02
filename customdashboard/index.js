const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

const messages=[]
app.get("/",(req,res)=>{
    res.json(messages)
})

app.post("/git-info",(req,res)=>{
    const data=req.body
    messages.push(data)
    res.sendStatus(200)

})
const PORT=process.env.PORT|| 5061

app.listen(PORT,()=>console.log(`Listening on port ${PORT} `))