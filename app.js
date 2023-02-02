const express = require('express');
const https= require("https");

const app = express();
// app.use(BodyParser.urlencoded({extended: true}));

app.set('view engine', "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/css', express.static(__dirname + 'node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + 'node_modules/bootstrap/dist/js'))

app.use(express.static(__dirname + "/public"));


app.get("/",(req,res)=>{
    https.get("https://www.boredapi.com/api/activity/",(response)=>{
        response.on("data",function(data){
            const suggested = JSON.parse(data);
            res.render("home",{activity: suggested.activity});

        })
    })
})

app.listen(3000, ()=>{
    console.log("Server started at port 3000");
})

