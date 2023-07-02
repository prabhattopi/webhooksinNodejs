const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const axios = require("axios")
const app=express()
const PORT=process.env.port || 4000

app.use(express.json())

app.use(cors());
const webhooks={
COMMIT:[],
PUSH:[],
MERGE:[]
}
app.get("/",(req,res)=>{
    res.status(200).json({message:"hello world"})
})
app.post("/api/webhooks",(req,res)=>{

      const {payloadUrl,secret,eventTypes}=req.body;
      //['coomit"]
      eventTypes.forEach(eventType=>{
webhooks[eventType].push({payloadUrl,secret})

      })
      res.sendStatus(201)

})
app.post("/api/event-emulate",(req,res)=>{
    const {type,data}=req.body;

    //Bussiness logic...

    //Event trigger (webhook)

    //async webhooks
    setTimeout(async ()=>{
      const webhookList=webhooks[type];
      for(let key of webhookList){
          const {payloadUrl,secret}=key
          try{
            await axios.post(payloadUrl,data,{
                headers:{
                    "x-secret":secret
                }
            })
          }
          catch(err){
            console.log(err)
          }
         
      }
    },0)
  

    res.sendStatus(200)



})

//don't use in production

app.get("/app/db",(req,res)=>{
    res.json(webhooks)
})
app.listen(PORT,()=>console.log(`Server is host on the port ${PORT}`))