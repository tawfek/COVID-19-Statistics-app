<?php
require_once 'vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();


$SupportedCountries = [ 'Bahrain', 'Cyprus', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Palestine', 'Qatar', 'Saudi-Arabia', 'Syria', 'Turkey', 'UAE', 'Yemen'];


define('SUPPORTED_CONUTRIES', $SupportedCountries);
define("RAPID_API_HOST", $_ENV['RAPID_API_HOST']);
define("RAPID_API_KEY", $_ENV['RAPID_API_KEY']);
define("CACHE_PATH", $_ENV['CACHE_PATH']);
define("ENABLE_CACHE", $_ENV['ENABLE_CACHE'] == 'true' || $_ENV['ENABLE_CACHE'] == "true" ? true : false);
