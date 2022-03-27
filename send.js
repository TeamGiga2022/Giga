$("send").click(function(){
    var emailAdress=$("#receiver").val();
    var carbonCopy=$("#cc").val();
    var subject=$("#subject").val();
    var txtBody=$("#bcc").val();
    var atch=$("#atch").val();
    db.transaction(function(transaction){
        var sql="INSERT INTO email(receiver,cc,subject,bcc) VALUES (?,?,?,?)";
    transaction.executeSQL(sql,[receiver,cc,subject,bcc],
        function(){
            alert("Email sent successfully");
        },function(transaction,err){
            alert(err.message);
        })
    })
})