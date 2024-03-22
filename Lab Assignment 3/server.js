const express = require("express");
let server = express();
server.set("view engine","ejs");
server.use(express.static("public"));
server.get("/contactUs", function(req,res){    
    res.render("contactUs");
})
server.get("/", function(req,res){
    // res.send("Hello Class");
    // res.send({name:"Usman", age:40});
    res.render("homepage");
})

server.listen(3000);