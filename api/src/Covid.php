<?php

namespace Tawfek;

use Tawfek\RapidApi;
use \DateTime;
use Phpfastcache\CacheManager;
use Phpfastcache\Config\ConfigurationOption;

class Covid
{
    public $Countries = ['Bahrain', 'Cyprus', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Palestine', 'Qatar', 'Saudi-Arabia', 'Syria', 'Turkey', 'UAE', 'Yemen'];
    private $rapidApi;
    protected $QueryStrins = [];
    protected $InstanceCache = null;
    protected $cacheDir = CACHE_PATH;
    public function __construct()
    {
        // echo $_SERVER["DOCUMENT_ROOT"]; 
        $this->rapidApi = new RapidApi();
        foreach ($this->Countries as $country) {
            $this->rapidApi->addCountry($country);
        }

        $this->QueryStrins = $this->getQueryStringParams();
        if (!is_dir($this->cacheDir)  && !file_exists($this->cacheDir)) {
            $oldmask = umask(0);
            mkdir($this->cacheDir, 0777, true);
            umask($oldmask);
        }
        CacheManager::setDefaultConfig(new ConfigurationOption([
            'path' => $this->cacheDir, // or in windows "C:/tmp/"
        ]));

        if (ENABLE_CACHE) {
            $this->InstanceCache = CacheManager::getInstance('files');
        }

        
    }



    /**
     * Boot the app , and get respons.
     * @return void
     */
    public function boot(): void
    {


        $country = $this->GetCountryFromRequest();
        $date = $this->GetDateFromRequest();
        $CacheCountry = ENABLE_CACHE ? $this->InstanceCache->getItem($country) : true;
        $CacheDate = ENABLE_CACHE ? $this->InstanceCache->getItem($date) : true;

        if ($country === null && $date === null || ($country === "" && $date === "")) {
            $this->rapidApi->response(["error" => 400, "message" => "Country , or day is required "], 400);
        } else {

            if ($country !== null && $country !== "") {
                if ($this->CheckCountryAvailability($country)) {
                    if (ENABLE_CACHE && !$CacheCountry->isHit()) {
                        $result = [$this->rapidApi->getCountryDataByDate($country)];
                        $CacheCountry->set($result)->expiresAfter(86400); //in seconds, cache data for 1 day.
                        $this->InstanceCache->save($CacheCountry); // Save the cache item just like you do with doctrine and entities   
                        $this->rapidApi->response($CacheCountry->get());
                    } else {
                        if (ENABLE_CACHE) {
                            $this->rapidApi->response($CacheCountry->get());
                        } else {
                            $this->rapidApi->response([$this->rapidApi->getCountryDataByDate($country)]);
                        }
                    }
                } else {
                    $this->rapidApi->response(["error" => 404, "message" => "country not fonud"], 404);
                }
            }

            if ($date !== null && $date !== "") {
                if ($this->validateDate($date)) {
                    if (ENABLE_CACHE && !$CacheDate->isHit()) {
                        $result = [$this->rapidApi->getAllCountriesData($date)];
                        $CacheDate->set($result)->expiresAfter(518400); //in seconds, cache data for 7 days 
                        $this->InstanceCache->save($CacheDate); // Save the cache item just like you do with doctrine and entities   
                        $this->rapidApi->response($CacheDate->get());
                    } else {

                        if (ENABLE_CACHE) {
                            $this->rapidApi->response($CacheDate->get());
                        } else {
                            $this->rapidApi->response([$this->rapidApi->getAllCountriesData($date)]);
                        }
                    }
                } else {
                    $this->rapidApi->response(["error" => 400, "message" => "Date is invalid format, expected format (y-m-d) , example : 2022-02-22"], 400);
                }
            }
        }
    }


    /**
     * add country to the list of supported countries.
     * @param String $country required , name of the country
     * @return void
     */
    public function addCountry($country): void
    {
        $this->rapidApi->addCountry($country);
    }


    /**
     * Get querystring params.
     * 
     * @return array
     */
    protected function getQueryStringParams()
    {
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $args);
        } else {
            $args = array();
        }
        return $args;
    }

    /**
     * Get country parameter from url . 
     * @return String
     */
    protected function GetCountryFromRequest(): String
    {
        return $this->QueryStrins['country'] ?? "";
    }

    /**
     * Get date parameter from url . 
     * @return String
     */
    protected function GetDateFromRequest(): String
    {
        return $this->QueryStrins['d'] ?? "";
    }

    /**
     * Check if country is in the list of supported countries.
     * @param String $country_name required
     * @return Bool
     */
    protected function CheckCountryAvailability($country_name): Bool
    {
        return in_array($country_name, $this->Countries);
    }

    /**
     *  Validate Date if matched a specified format .
     * @param String $date required 
     * @param String $format optional , default format Y-m-d
     * @return Bool
     */
    protected function validateDate($date, $format = 'Y-m-d'): Bool
    {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) === $date ? true : false;
    }
}
