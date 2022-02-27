<?php
require_once __DIR__.'/include/config.php';
use Tawfek\Covid ; 

$covid = new Covid ;
try{
    $covid->boot(); 
}catch(Exception $e){
    echo $e->getMessage();
}