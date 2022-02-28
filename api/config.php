<?php 
require_once 'vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();


define("RAPID_API_HOST",$_ENV['RAPID_API_HOST']);
define("RAPID_API_KEY",$_ENV['RAPID_API_KEY']);
define("CACHE_PATH",$_ENV['CACHE_PATH']) ;
define("ENABLE_CACHE",$_ENV['ENABLE_CACHE'] == 'true' || $_ENV['ENABLE_CACHE'] == "true"? true : false);