const express = require('express');
var mysql = require("mysql2");
var bodyParser = require("body-parser")

//express app
const app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wordpass",
  database: "emaildb"
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//global arrays
var array;
var array2;
var idnumber= 1;
var idvalue = 3;
var letter;

//connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //now query database
  con.query("SELECT * FROM email", function (err, rows) {
    if (err) throw err;
    console.log("data recieved from DB:");
    console.log(rows);
    rows.forEach( (row) => {
      console.log(`${row.sender} is the row dot sender`);
      console.log(`${row.receiver} is the reciever`);
      array= rows/*[
            {id: `${row.id}`, sender: `${row.sender}`, receiver: `${row.receiver}`, cc: `${row.cc}`, bcc: `${row.bcc}`, subject: `${row.subject}`, userid: `${row.userid}` },
          ];*/
    });
  });//end query
  //array2 query
  con.query("SELECT * FROM note", function (err, rows) {
    if (err) throw err;

    console.log("data recieved from DB:");
    console.log(rows);
    array2= rows;
  });//end second query

});//end mysql connection



//pages
app.get("/index.ejs", (req, res) => {
  res.render('index', { titles: 'inbox', blogs: array});
});

app.get("/outbox.ejs", (req, res) => {
  res.render('outbox', { titles: 'outbox', blogs: array});
});

// redirects
app.get('/sendmessage.ejs', (req, res) => {
  res.render('sendmessage', { titles: 'sendmessage', blogs: array});
});

app.get('/addnote.ejs', (req, res) => {
  res.render('addnote', { titles: 'addnote', blogs: array});
});

app.get('/readmail.ejs', (req, res) => {
  console.log(req.body);
  //connect to database
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //now query database
    con.query("SELECT * FROM email where id = ?", idvalue, function (err, rows) {
      if (err) throw err;

      console.log("data recieved from DB:");
      console.log(rows);
      letter = rows;
      console.log(idvalue);
      console.log(letter);

    });//end second query
  });//end mysql connection
  res.render('readmail',{ titles: 'readmail', blogs: array });
});

app.get('/notes.ejs', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //now query database
    con.query("SELECT * FROM note", function (err, rows) {
      if (err) throw err;

      console.log("data recieved from DB:");
      array2= rows;
    });//end second query
  });//end mysql connection
  res.render('notes', { titles: 'notes', notes: array2});
});

app.post('/', (req, res) => {
  console.log(req.body);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var new_email = {id: idnumber, sender: "Alex Komarov", receiver: `${req.body.email}`, cc: `${req.body.cc}`, bcc: `${req.body.bcc}`, subject: `${req.body.subject}`, message: `${req.body.body}`, user_id: "0" };
    idnumber += 1;
    console.log(idnumber);
    //Create an insert query
    con.query("INSERT INTO email SET ?", new_email, (err, res) =>{
      if(err) throw err;

    });//ends insert query
  });//disconnect here

});//ends the post method

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);
// 404 page
/*
app.get('/', (req, res) => {
  res.status(404).sendFile('./folder/404.html', {root: __dirname});
});
*/
