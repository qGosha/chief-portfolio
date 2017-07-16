<?php
session_start();

if($_POST["captcha"] == $_SESSION["security_code"]) {


$to = 'qgosha@list.ru';
$subject = 'from site';
$user_name = $_POST['user_name'];
$user_email = $_POST['user_email'];
$message = '<html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$user_name.'</p>
                        <p>Сообщение: '.$_POST['user_message'].'</p>                        
                    </body>
                </html>';


$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Отправитель <from@example.com>\r\n";

// mail ($to, $subject, $message, $headers);

$string = $message . 'HEADER: '. $headers;

$fp = fopen('C:\wamp64\www\mysite\file.txt', 'w');
fwrite($fp, $string);
fclose($fp);

echo 1;
}
else  echo 0;
?>