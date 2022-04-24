const express =require('express');
const mysql = require('mysql');
var bodyParser=require('body-parser');
const app = express();
const port= 3000

//Create Database
const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'email'
});

app.get('/',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadId}')

        //connection.query('SELECT sender from details',(err,rows)=>{
            var sender = connection.query('SELECT sender from details')
            //connection.release()

            if(!err)
                res.send(rows)
            else{
                console.log(err)
            }
        })
    })
