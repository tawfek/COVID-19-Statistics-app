<?php
require_once __DIR__ . '/config.php';

use Tawfek\Covid;

$covid = new Covid;

try {
    $covid->addCountries(SUPPORTED_CONUTRIES) ;
    $covid->boot();
} catch (Exception $e) {
    echo $e->getMessage();
}
