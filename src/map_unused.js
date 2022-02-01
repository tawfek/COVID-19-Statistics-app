import React, { useState, useRef } from 'react';
import ReactMapGL,{Marker,FlyToInterpolator,NavigationControl} from 'react-map-gl'
import { setRTLTextPlugin } from "mapbox-gl";
import * as MapboxLan from '@mapbox/mapbox-gl-language'
import * as MarkerDB from './countries.json'
import 'mapbox-gl/src/css/mapbox-gl.css';
import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Row,Col ,Popover,Button,Tooltip} from 'antd';
import Status from './status'
import Lang2set from './lang2set'
import Flag from "react-flags";


setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true
);
const API_LINK = "http://127.0.0.3/covid-api/cov.php?";
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGF3ZmVrIiwiYSI6ImNqMG14bjFrYTAwMW8yd251cm14dnNiaGwifQ.HBES0LqkE-Jcxs24amwGuw'; // Set your mapbox token here
const defaultViewPort = {
  latitude :26.96 ,
  longitude :50.06 ,
  zoom :3 ,
  mapboxApiAccessToken:MAPBOX_TOKEN,
  width:"100vw",
  height:"80vh"}


//,
//29.2985,42.5510




const GetStatus = ()=>{
  var full_status = [];
var fetched_countries = [];
  console.log('GETTING...')
  var Links = []
  
  MarkerDB.countries.forEach((country)=>{
    Links.push(country.country.search);
  })
   Links.map((search)=>{
    if(fetched_countries.includes(search)==false){
 
      fetch(API_LINK+"country="+search)
      .then(res =>res.json())
      .then(result=>{
        console.log(search)
        fetched_countries.push(search) ;
        if(full_status.length==(Links.length-1)){
            console.log('DATA ALREADE ADDED') ;
        }else{
          console.log(full_status.length,Links.length)
          console.log(result.error)
        if(result.error == undefined){
          full_status.push(result) ;
        }
      }
      })
    } 
  
  }
      )
 
}

class Mapo extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      c:{
        latitude :29.2985,
        longitude :42.5510,
        zoom :3.66 ,
      }
    };
  }

  state = {
    viewport: {
      latitude: 37.8,
      longitude: 96,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };
  render(){
    const loc=this.state.c
  const setLoc = (cc)=>{
    this.setState({
      c:cc
    })
  }


 
const { latitude, longitude, zoom } = loc;
const ReloadButton = ()=>{
  if(Number(latitude).toFixed(2)!=Number(defaultViewPort.latitude).toFixed(2) || Number(longitude).toFixed(2)!=Number(defaultViewPort.longitude).toFixed(2) || Number(zoom).toFixed(2)!=Number(defaultViewPort.zoom).toFixed(2)){
    return <Button className="reload-viewport" shape="circle" onClick={()=>FlyMe()}  icon={<ReloadOutlined />}></Button>;
  }else{
    return '';
  }
}
const MapUpdater = ()=>{
 
  }
function FlyMe(lat=defaultViewPort.latitude,lng=defaultViewPort.longitude,zoom=defaultViewPort.zoom) {
  // var mapRef = useRef();
  const FlyTo =    {latitude :Number(lat),
       longitude :Number(lng),
       zoom :Number(zoom) ,
       mapboxApiAccessToken:MAPBOX_TOKEN,
       hash:true,
 }
  
    //  const mapR = mapRef.current?mapRef.current.getMap():'';
    //  if(mapR!=''){
   setViewport(FlyTo);
           setLoc(FlyTo)
    //  } 

 }
 const Map=()=>{

return (
  <ReactMapGL   ref={useRef()}  transitionDuration={1000}
{...viewport}  
  hash={true}
mapStyle="mapbox://styles/tawfek/ck8wzbpb62xuh1ipbhqg8ef7p"
transitionInterpolator={new FlyToInterpolator()}
onViewportChange={(viewport)=>{setViewport(viewport);setLoc({latitude:viewport.latitude.toFixed(2),longitude:viewport.longitude.toFixed(2),zoom:viewport.zoom.toFixed(2)})}}
>
{MarkerDB.countries.map((country)=>{
   const country_name_lan = (Lang2set()=="en")?country.country.name:country.country.name_ar;
  return (
    <Marker   key={country.country.coordinates.lat} latitude={Number(country.country.coordinates.lat)} longitude={Number(country.country.coordinates.lng)}>
     <Popover content={`🌐: ${longitude},${latitude} 🔎: ${zoom}`} title={(<div>Coordinate & zoom <Button shape="circle" onClick={()=>FlyMe()} size="small" icon={<ReloadOutlined />}></Button></div>)} trigger="focus">
     <Tooltip   title={country.country.emoji+" "+country_name_lan} arrowPointAtCenter>
     <button  onClick={()=>FlyMe(country.country.coordinates.lat,country.country.coordinates.lng,6)}  className="request-loader Flags" style={{background:"url(/flags-iso/flat/svg/"+country.country.iso+".svg)"}}>
    <span>

    </span>
  </button></Tooltip></Popover></Marker>
  );})}
<div className="map-tools">
      <Popover content={`🌐: ${longitude},${latitude} 🔎: ${zoom}`} title={(<div>Coordinate & zoom <Button shape="circle" onClick={()=>FlyMe()} size="small" icon={<ReloadOutlined />}></Button></div>)} trigger="focus">
      <Button shape="circle" icon={<InfoCircleOutlined />}  className="itude">
       </Button>
         </Popover>
         <NavigationControl />
         {(Number(latitude).toFixed(2)!=Number(defaultViewPort.latitude).toFixed(2) || Number(longitude).toFixed(2)!=Number(defaultViewPort.longitude).toFixed(2) ||
 Number(zoom).toFixed(2)!=Number(defaultViewPort.zoom).toFixed(2))?(<ReloadButton/>):''}
</div>
 </ReactMapGL>
);


 }
       return (


        
    <Row justify="center">
    <Col span={24}>
        <Map/>
         </Col>
 <Col className="content"  justify="center" align="middle"  xs={24} xm={24} md={{span:24}} lg={{span:22,offset:1}} xl={{span:20,offset:2}}>
 <Row     justify="center" align="middle" >
   <Col md={24} sm={24} className="content-1" >
    <Status/>
   </Col>
  </Row>
 </Col>
 
 </Row>
  )
 }
}
export default Mapo 