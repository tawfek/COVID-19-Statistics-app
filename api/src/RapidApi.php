<?php

namespace Tawfek;

class RapidApi
{
    private $header;
    private $host, $key = null;
    private $secure = true;
    private $protocol;
    private $methods = array(
        "history" => "history?",
        "statistics" => "statistics?",
    );
    public $Countries = [];
    public function __construct()
    {
        $this->host = $_ENV['RAPID_API_HOST'];
        $this->key = $_ENV['RAPID_API_KEY'];
        $this->protocol = $this->secure ? "https" : "http";
        $this->header = [
            "http" => [
                "method" => "GET",
                "header" => "Accept-language: en\r\n" .
                    "x-rapidapi-host: $this->host\r\n" .
                    "x-rapidapi-key: $this->key\r\n"
            ]
        ];
    }

    /**
     * Creates a stream context that hold headers.
     * @param array $header required array of headers data to set in context
     * @return resource
     */
    private function CreateStreamContext(array $headers)
    {
        return stream_context_create($headers);
    }

    /**
     * Send request to url and get content.
     * @param string $uri required  Url of the api destination.
     * @param context $context required headers in the request
     * @return string
     */
    private function getContents(string $uri, $context): String
    {
        $get = @file_get_contents($uri, false, $context);
        if ($get === false) {
            throw new \Exception("Please check your rapid api key , or host , error : " . error_get_last()["message"]);
        } else {
            return $get;
        }
    }


    /**
     * Get date .
     * @param String $format Optional - return today date if not assignt  
     * @return String
     */
    private function getTodayDate($format = "Y-m-d"): String
    {
        return date($format);
    }

    /**
     * Convert array to Url encoded string
     * @param array $queries required , array of paramters.
     * @return String
     */
    private function QueryBuilder(array $queries): String
    {
        return http_build_query($queries);
    }

    /**
     * Parase url 
     * @param string $method required , methods available in rapidapi
     * @param string $params required , Url parameters
     * @return String
     */
    private function buildUrl($method, $params): String
    {
        return "{$this->protocol}://{$this->host}/{$this->methods[$method]}{$params}";
    }

    /**
     * Get History of country statistics by date.
     * @param String $country required , conutry name 
     * @param String $date  optional , if not assigned returns today's dates
     * @return array
     */
    public function getCountryDataByDate(String $country, String $date = null): array
    {
        $query = $this->QueryBuilder(array(
            "day" => $date !== null ? $date : $this->getTodayDate(),
            "country" => $country
        ));
        $url = $this->buildUrl('history', $query);

        $context = $this->CreateStreamContext($this->header);
        try {
            $data = $this->getContents($url, $context);
            return $data ? json_decode($data, true) : array();
        } catch (\Exception $e) {
            $this->response(["error" => 500, "message" => $e->getMessage()], 500);
        }
    }
    /**
     * Add country to list of countries
     * @param String $countryName required
     * @return void
     */
    public function addCountry($countryName): void
    {
        array_push($this->Countries, $countryName);
    }

    /**
     * Get data foreach country listed in Countries list . 
     * @param String $date optional , if not assigned returns today's date
     * @return Array
     */
    public function getAllCountriesData($date = null): array
    {
        $result = [];
        foreach ($this->Countries as $country) {
            $data = $this->getCountryDataByDate($country, $date);
            array_push($result, $data);
        }
        return ($result);
    }

    public function response($array, $status_code = 200)
    {
        http_response_code($status_code);
        header_remove('Set-Cookie');
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        die(json_encode($array));
    }
}
