<?php 
require_once 'vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__.'../../');
$dotenv->load();


define("RAPID_API_HOST",$_ENV['RAPID_API_HOST']);
define("RAPID_API_KEY",$_ENV['RAPID_API_KEY']);