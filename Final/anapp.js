const express = require('express');
var mysql = require("mysql2");

//express app
const app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hannaloreitt123",
  database: "emaildb"
});

var people1;

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
      people1 = `${row.receiver}`;
    });
  });//end second query
});//end mysql connection

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//pages
app.get("/", (req, res) => {
  //res.sendFile('./folder/index.html', {root: __dirname}); //, blogs: array
  const same = 'Rhizo';
  const array = [
    {title: 'sender title', receiver: 'reckblock'},
    {title: 'sender title2', receiver: 'reckblock2'},
  ];
  res.render('index', { titles: 'home', same, blogs: array, people1: people1});
});

app.get("/outbox", (req, res) => {
  res.sendFile('./views/outbox.html', {root: __dirname});
});

// redirects
app.get('/readmail.html', (req, res) => {
  res.sendFile('./readmail.html', {root: __dirname});
});

// 404 page
app.get('/readmail.html', (req, res) => {
  res.status(404).sendFile('./folder/404.html', {root: __dirname});
});
