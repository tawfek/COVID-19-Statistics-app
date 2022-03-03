# 💻 Installation

## Clone the repository&#x20;

`# git clone https://github.com/tawfek/covid19-statistics.git`

## Required API tokens&#x20;



#### Mapbox&#x20;

go to [Mapbox ](https://mapbox.com)and create an account, in the [account page ](https://account.mapbox.com)create a new token. copy the token and add it to the[ .env file](.env.example)

#### IPINFO

go to [IPINFO.COM](https://ipinfo.io) and create an account, then go to the [token page](https://ipinfo.io/account/token) copy the token and add it to the [.env file](.env.example)

![](<.gitbook/assets/image (1).png>)

#### RapidAPI&#x20;

signup to [Rapidapi ](https://rapidapi.com/signup)then go to the [covid-19 api application](https://rapidapi.com/api-sports/api/covid-193) subscribe to it, from the code snippet copy your `x-rapidapi-key and add to` [`.env file`](api/.env.example)``

{% hint style="info" %}
`please note that rapidApi app key should be in the .env file of the api you can see it in` [`api/.env`](api/.env.example)``

``
{% endhint %}

![](<.gitbook/assets/image (2).png>)

## Install dependency and packages

inside the project folder run&#x20;

&#x20;`# npm install`&#x20;

``

Inside the API folder run&#x20;

&#x20;`# composer install`&#x20;

``

## Running the API server locally&#x20;

inside the [API folder](https://github.com/tawfek/covid19-statistics/tree/master/api) RUN&#x20;

&#x20;`# php -S YOUR-LOCAL-IP:PORT`

then in the react [.env file](.env.example) change the `REACT_APP_ENDPOINT` host with **`YOUR-LOCAL-IP:PORT`**

## Running the app



after editing and configuring your tokens and APISyou can now run the app by entering&#x20;

&#x20;`# npm run start`

the app will be running on [localhost:3000](http://localhost:3000)

