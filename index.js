const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js")
const mongoose = require("mongoose")
const _ = require("lodash");
const app = express();
// const task =["Wake up","Check Mails"]
const worktask=[]
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.set("strictQuery", false); 
mongoose.connect("mongodb+srv://admin_Harsh:harsh%4098@cluster0.v3e3ybb.mongodb.net/tasksDB");
// For "/" page
const taskSchema = mongoose.Schema({
  name:{type:String,required:true}
}); 
const task = mongoose.model("Task",taskSchema);
const task1 = new task({
  name:"Check Emails"
});
const task2 =new task({name:"Order veggies"
});
const taks3 = new task({
  name:"Pay the bills"
});
const listSchema = mongoose.Schema({
  listname:String,
  items:[taskSchema]

})
const   list = mongoose.model("List",listSchema)



app.get("/",function(req,res){
 
  let day =  date.getDate();
  task.find(function(err,tasks){
    if(err){
      console.log(err);
    }
    else{
          if (tasks.length===0){
            task.insertMany([task1,task2,taks3],function(err){
              if(err){
                console.log(err);
              }
              else{
                console.log("Tasks added");  
              
              }
            })
          res.redirect("/");
          }
        else{
        res.render("todo",{listTitle:"Today",newtask:tasks});}

      
    }
  })


})
//For getting data from the for the html form element
app.get("/:text",function(req,res){
  const listName = _.capitalize(req.params.text);
  if (list.findOne({listname:listName},function(err,foundlist){
    if(!err){
      if(!foundlist){
        const lists = new list({
          listname:listName,
          items:[task1,task2,taks3]

        })
        lists.save(function(err,result){;
        res.redirect("/"+listName);
      })
        
        
      }
      else{
       res.render("todo",{listTitle:listName,newtask:foundlist.items});
      }
    }
  })){

  }
 

})
app.post("/",function(req,res){
  const fountListname = req.body.Addtask;
  console.log(fountListname);
 const newtask = new task({
  name:req.body.Entry
 });
 if (req.body.Addtask==="Today"){
 newtask.save();
 res.redirect("/");}
 else{
  list.findOne({listname:fountListname},function(err,foundList){
    if(!err){
    foundList.items.push(newtask)
    foundList.save(function(err,result){
      res.redirect("/"+req.body.Addtask);
    })}
  })
 }

})
app.post("/delete",function(req,res){
const listcheck = req.body.Todolistname;
const itemid = req.body.checkbox;
console.log(listcheck)
if(listcheck==="Today"){
  task.findByIdAndRemove(req.body.checkbox,function(err){
    if(!err){
      console.log(req.body.checkbox);
      res.redirect("/");}
})
}
else{
  list.findOneAndUpdate({listname:req.body.Todolistname},{$pull:{items:{_id:req.body.checkbox}}},function(err,foundlist){
    if(!err){
      res.redirect("/"+req.body.Todolistname);
    }
  })
  }
});


 

  
  


app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000,function(){
    console.log("Server has been started  at the desired gateway");
})