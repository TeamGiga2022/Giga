var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hannaloreitt123",
  database: "emaildb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var email = form.email;
  console.log(email);
  const new_email = {id: "2", sender: "boop", receiver: "snoot", cc: "", bcc: "", subject: "sql_injection", user_id: "0" };

  //Create an insert query
  con.query("INSERT INTO email SET ?", new_email, (err, res) =>{
    if(err) throw err;
    console.log("last insert id:", res.insertId);
  });
});
