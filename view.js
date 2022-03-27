$("view").click(function(){
    db.transaction(function(transaction){
        var sql= "SELECT sender,subject FROM email ORDER BY id DESC";
        transaction.executeSql(sql,undefined,function(transaction,result){

            if(result.row.lenght){

                for(var i=0;i<result.lenght;i++){
                    var row=result.row.item(i);
                    var name=row.sender;
                    var subject=row.subject;
                }
            }
        })
    })
})
