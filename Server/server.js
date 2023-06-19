const express=require("express");
const exp=express()
const mongoclient =require("mongodb").MongoClient;
const cors = require('cors');
exp.use(cors());
exp.use(express.json());

var groups;
var mainproject;

exp.get('/',(req,res)=>{
    res.send("database connected .....");
})


exp.post('/createGroup',(req,res)=>{
  console.log("create group entered");

  console.log("staffName:---"+req.body.StaffName);console.log("Groups:---"+req.body.groupName);
  
  groups.createCollection(req.body.groupName,(err)=>{
        if(err){
            res.send("Group aldredy Exits....");
            return;
        } 
        res.send("collection created...");
        mainproject.collection("Staff").findOneAndUpdate( { Sid: req.body.Sid },{  $push: { groups:req.body.groupName } },(err)=>{
        console.log("entered and begaine..");
        if (err) throw err;
        console.log("sucessfully updated or added ");
      })
   })
})

exp.post('/getGroupsData',(req,res)=>{
    console.log(typeof(req.body.Sid));
    console.log(req.body.Sid);
    console.log(req.body);
    mainproject.collection("Staff").find({Sid:req.body.Sid}).toArray((err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send(result);
    });
});

//Displaying message
exp.get('/clickedGroupDatas',(req,res)=>{
    let groupName="cseaiv";
    groups.collection(groupName).find({}).toArray((err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send(result);
    });
})

// //insert Message
exp.get('/SendMessage/:collname/:roll',(req,res)=>{
  const groupName="cseaiv";
  groups.collection(groupName).insertOne({"Msg":`${req.params.collname}`,"id":`${req.params.roll}`},(err)=>{
      if(err) throw err;
      res.send("sucessfully Inserted....");
  });
})

//Adding the groupName to Student
exp.get('/addstudent/:dept/:groupName',(req,res)=>{
    // let dept="CSEAIV";
    // let groupName="cseaiv";
    mainproject.collection("student").updateMany(
        { dept: req.params.dept },
        { $push: { groups: req.params.groupName } },
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("An error occurred during the update operation.");
          } else {
            res.send("Successfully updated or added.");
          }
        }
      );
})


// exp.get('/collections',(req,res)=>{
//   database.listCollections().toArray((err,result)=>{
//       if(err) throw err;
//       res.send(result);
//   })
// })

exp.listen(3333,()=>{
    // mongoclient.connect("mongodb://0.0.0.0:27017", (err, result)=>{
    mongoclient.connect("mongodb://0.0.0.0:27017/",{useNewUrlParser:true},(err,result)=>{
        if(err) throw err;
        groups=result.db("Groups");
        mainproject=result.db("MainProject");
        console.log("Sucessfully connected with MongoDB . . .");
    });
});
