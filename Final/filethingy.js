//var http = require('http');
var mysql = require("mysql2");
/*
http.createServer(function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("helloworld!");
}).listen(8080);
*/
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hannaloreitt123",
  database: "emaildb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("SELECT * FROM email", function (err, result /*, fields */) {
    if (err) throw err;
    console.log("Result: " + result);
    //console.log(fields);

  });//end first query

  con.query("SELECT * FROM email", function (err, rows) {
    if (err) throw err;

    console.log("data recieved from DB:");
    console.log(rows);
    rows.forEach( (row) => {
      console.log(`${row.sender} is the row dot sender`);
      console.log(`${row.receiver} is the reciever`);
    });
  });//end second query

  //var sqlcommand = "INSERT INTO contact (id, name, address, phone_number, email) VALUES ( 0, 'Alex Komarov', '19 brehon grove', '0867821846', 'email@email.com')";


  //make values to insert
  const new_email = {id: "2", sender: "boop", receiver: "snoot", cc: "", bcc: "", subject: "sql_injection", user_id: "0" };
  //Create an insert query
  con.query("INSERT INTO email SET ?", new_email, (err, res) =>{
    if(err) throw err;
    console.log("last insert id:", res.insertId);
  });

  /*
  //insert query
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  }); */

  //execute an update query
  con.query(
    'UPDATE email SET sender = ? WHERE id = ?',
    ["boople", 2],
    (err, result) => {
      if (err) throw err;
      console.log(`changed ${result.changedRows} row(s)`);
    }
  );

  //delete query
  con.query('DELETE FROM email WHERE id = ?', [2], (err, result) => {
    if (err) throw err;

    console.log(`Deleted ${result.affectedRows} row(s)`);
  });

  //avoid SQL_injection
  /*
  con.query(`SELECT * FROM email WHERE id = ${mysql.escape(userSubmittedVariable)}`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }); */


});//end mysql connection
