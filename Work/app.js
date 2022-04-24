// imports 
const express =require('express');
const mysql = require('mysql');
var bodyParser=require('body-parser');
const Connection = require('mysql/lib/Connection');
const app = express();
const port= 3000


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.post('/',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
}) 


app.use(express.static(__dirname+'/Giga-master'));
app.get('',(req,res)=>{
    res.sendFile(__dirname+'/Giga-master/index.html')
});


// Listen 
app.listen(port,() => {
    console.log('Server started on port 3000');
});

