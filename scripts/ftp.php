<?php session_start();

try {
    $imageName = $_POST['imagefile'];

    $contentPath = '../content/user_screenshots/'.$imageName;

// connect and login to FTP server
    $host = "552779.infhaarlem.nl";
    $onlineFileDestination = '/public_html/handimg/' . $imageName;

// FTP access parameters
    $usr = 's552779';
    $pwd = 'AJQhEQ8b';


// connect to FTP server (port 21)
    $conn_id = ftp_connect($host, 21) or die ("Cannot connect to host");

// send access parameters
    ftp_login($conn_id, $usr, $pwd) or die("Cannot login");

// turn on passive mode transfers (some servers need this)
// ftp_pasv ($conn_id, true);

// perform file upload
    $upload = ftp_put($conn_id, $onlineFileDestination, $contentPath, FTP_BINARY);
} catch (Exception $e) {
    //echo "Failure: " . $e->getMessage();
}
