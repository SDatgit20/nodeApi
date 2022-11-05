var express=require('express');
var app=express();
var user=require('./user.model');
var db = require('./db.config'), sequelize = db.sequelize;
var bcrypt=require('bcrypt');
var bodyparser=require('body-parser');
app.use(bodyparser.json());

app.get("/users",function(req,res){
    sequelize.sync().then(() => {

        user.findAll().then(result => {
            res.send(200,"User list "+"\n"+JSON.stringify(result));
        }).catch((error) => {
            res.status(500);
            console.error('Failed to retrieve data : ', error);
            res.end();
        });
    
    });
})

app.get("/getUser",function(req,res){
    user.findOne({
        where: {
            id : req.query.id
        }
    }).then(result => {
        res.send(JSON.stringify(result));
    }).catch((error) => {
        res.status(500);
        res.send('Failed to retrieve data : ', error);
    });

})

app.post("/addUser",function(req,res){
    var hashPassword=bcrypt.hashSync(req.body.password, 10);
    user.create({
        name: req.body.name,
        password: hashPassword,
        profession: req.body.profession,
        id: req.body.id
    }).then(result => {
        res.status(201)
        res.send("User added successfully!");
    }).catch((error) => {
        res.status(500).end();
        console.error('Failed to create a new record : ', error);
    });
})

app.delete("/deleteUser",function(req,res){
    var userId=req.query.id;
    user.destroy({
        where: {
          id: userId
        }
    }).then(() => {
        res.status(200);
        res.send("Successfully deleted record.");
    }).catch((error) => {
        res.status(500);
        res.send('Failed to delete record : ', error);
    });
})

app.put("/editUser",function(req,res){
    user.update({
            name:req.body.name,
            password:req.body.password,
            profession:req.body.profession,
        },
        {
        where: {
          id: req.query.id
        }
        }).then(() => {
        res.send("Successfully updated user details!");
    }).catch((error) => {
        res.status(500);
        res.send('Failed to update user details : ', error);
    });
})

app.listen(3000);