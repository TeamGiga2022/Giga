<?php
    $email = $_POST['email'];
    $cc = $_POST['cc'];
    $bcc = $_POST['bcc'];
    $subject = $_POST['subject'];
    $body = $_POST['body'];

    // Database connection
    $conn = new mysqli('localhost','root','','test');
    if($conn->connect_error){
        echo "$conn->connect_error";
        die("Connection Failed : ". $conn->connect_error);
    } else {
        $stmt = $conn->prepare("insert into details(sender, receiver, adress, cc, body) values(?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $email, $cc, $bcc, $subject, $body);
        $execval = $stmt->execute();
        echo $execval;
        echo "Registration successfully...";
        $stmt->close();
        $conn->close();
    }
?>