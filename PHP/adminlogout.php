<?php
/**
 * Created by PhpStorm.
 * User: mgeer
 * Date: 17-6-2018
 * Time: 13:00
 */

require_once('db_adminlogin.php');
$db = new db_adminlogin();

if(isset($_COOKIE['admin_guid'])){
    $guid = $_COOKIE['admin_guid'];

    $db->removeAdminUID($guid);

    setcookie('admin_guid', '', time()-10, '/');

    echo '<script>window.location.href = "admin.php";</script>';
}