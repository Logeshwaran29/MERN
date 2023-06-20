const express=require("express");
const exp=express()
const mongoclient =require("mongodb").MongoClient;
const cors = require('cors');
exp.use(cors());
exp.use(express.json());
exp.use(express.urlencoded({ extended: true }))

var db;

exp.get('/',(req,res)=>{
    res.send("database connected .....");
})

exp.post('/data',async(req,res)=>{
    try {
      await db.collection('details').find({email:req.body.email}).toArray((err,result)=>{
        if(err) throw err;
        res.json(result);
      });
    } catch (error) {
      console.log(error);
    }
});

exp.post('/login',async(req,res)=>{
  let email=req.body.email;
  let pass=req.body.password;
  try{
    const check =await db.collection('details').findOne({email:email});
    if(check){
      if(check.password===pass){
        res.json('ok');
      }else{
        res.json('fail');
      }
    }else res.json('fail');
  }catch(e){
    res.json('fail');
  }
});

exp.post('/signup',async(req,res)=>{
  const data={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  try{
    const check = await db.collection('details').findOne({email:data.email});
    if(check){
      res.json('fail');
    }else {
      await db.collection('details').insertOne(data);
      res.json('ok');
    }
  } catch(e){
    res.json('fail');
  }
});

exp.listen(3333,()=>{
    mongoclient.connect("mongodb://0.0.0.0:27017/",{useNewUrlParser:true},(err,result)=>{
        if(err) throw err;
        db = result.db("login");
        console.log("Sucessfully connected with MongoDB . . .");
    });
});
