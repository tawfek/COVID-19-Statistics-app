import store from '../store'
import {FlyToInterpolator} from 'react-map-gl'
import { setMapLoaded,setViewport ,setCurrentCountry,setCurrentCountryData} from "../store/actions";
import * as d3 from 'd3-ease';
import * as Countries from "../countries.json";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ar from 'javascript-time-ago/locale/ar'
TimeAgo.addLocale(en)
TimeAgo.addLocale(ar)

const {MapConfig,user} = store.getState()
const {mapboxApiAccessToken} = MapConfig 
const {language} = user 

const defaultViewPort = {
    latitude :26.96 ,
    longitude :50.06 ,
    zoom :3 }


    
export const FlyMe = (lat=defaultViewPort.latitude,lng=defaultViewPort.longitude,zoom=defaultViewPort.zoom,iso={},reload=true) =>{

    const FlyTo =    
        {latitude :Number(lat),
         longitude :Number(lng),
         zoom :Number(zoom) ,
         mapboxApiAccessToken:mapboxApiAccessToken,
         width:"100vw",
         logoPosition:"top-right",
         transitionDuration: 500,
         transitionInterpolator: new FlyToInterpolator(),
         transitionEasing: d3.easeCubic,
         }
         store.dispatch(setViewport(FlyTo)) ;
        if(!reload){
            store.dispatch(setViewport(FlyTo))
            setCountry(iso.currentKey)
          
        }
   };

export const setCountry = (CountryIsoOrName)  =>{
    let {isLoaded,data} = store.getState().data.fetchedData
    if(CountryIsoOrName !== null){ 
        let getCurrentCountry = Countries.countries.find(function(country) {
            return country.country.iso.indexOf(CountryIsoOrName) !== -1 || country.country.name.indexOf(CountryIsoOrName) !== -1 ;
        });
        let {search,iso} = getCurrentCountry.country ;
        let Country = {currentKey: iso, currentCountry: search}
        store.dispatch(setCurrentCountry(Country)) 
        if(isLoaded){
            let CountryData = data.find(function(country) {
                return country.country.indexOf(search) !== -1;
            });
            store.dispatch(setCurrentCountryData(CountryData.response)) ;
        }
    }
}
  export const ReactTimeago = (datee) => {
    const timeAgo = new TimeAgo(language);
     return timeAgo.format(datee) ;
    }