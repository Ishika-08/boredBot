const express = require('express');
const https= require("https");
const _ = require('lodash');

const app = express();
// app.use(BodyParser.urlencoded({extended: true}));

app.set('view engine', "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(express.static(__dirname + "/public"));


app.get("/",(req,res)=>{
    https.get("https://www.boredapi.com/api/activity/",(response)=>{
        response.on("data",function(data){
            const suggested = JSON.parse(data);
            res.render("home",{activity: suggested.activity, category:"All", render:"/"});
        })
    })
})

app.get("/:parameter",(req,res)=>{
    const url= "https://www.boredapi.com/api/activity?type=" + req.params.parameter;

    https.get(url,(response)=>{
        response.on("data",function(data){
            const suggested = JSON.parse(data);
            res.render("home",{activity: suggested.activity, category:_.capitalize(req.params.parameter), render:"/" + req.params.parameter});
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server started at port 3000");
})

