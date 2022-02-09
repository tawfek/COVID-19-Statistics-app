import React from 'react';
import Map from '../components/map/map'
import {connect} from "react-redux" 
import {BrowserRouter as Router,Switch} from "react-router-dom";
import * as MarkerDB from '../countries.json'
import { HeartFilled} from '@ant-design/icons';
import { Row, Col} from 'antd';
import Status from '../status'
 import __ from '../localization/tr'

import {setLat,setViewport,setFetchedData} from '../store/actions'



const API_LINK = "https://middlecovid.herokuapp.com/cov.php?";

function mapStateToProps(state) {
  return { user: state.user, country: state.country,viewport:state.viewport,MapConfig: state.MapConfig}
}

function mapDispatchToProps(dispatch){
  return { 
    setLat: (latitude) => dispatch(setLat(latitude)),
    setViewport: (viewport) => dispatch(setViewport(viewport)),
    setFetchedData : (data) => dispatch(setFetchedData(data))
  }
}

class AppPage extends React.Component{

  constructor(props){
      super(props)
   
    }
  

 
  state = {
        fetched:[],
        fetch_progress:0,
        fetch_loading:true,
        day:'',
        activekey:17,
    };





full_status = [];
fetched_countries = [];
 GetStatus = ()=>{
var Links = []
var full_status = this.full_status;
var fetched_counter = 0;
var fetched_countries= this.fetched_countries 
MarkerDB.countries.forEach((country)=>{
  Links.push(country.country.search);
})
 Links.map((search)=>{
   
   
    fetch(API_LINK+"country="+search)
   .then(res =>res.json())
   .then(result=>{
    fetched_counter+=1
      fetched_countries.push(search) ; 
      const f_progress = (fetched_counter/(Links.length-1))*100
      this.setState(({fetch_progress:f_progress}))
      if(result[0].response!==undefined){
      full_status.push({'country':search,'response':result[0].response[result[0].response.length-1]}) ;
      
      this.setState(({fetched:this.full_status}))
      this.props.setFetchedData({data:this.full_status,isLoaded:true})
      }
      if(fetched_counter===(Links.length-1)) {
         this.setState(({fetch_loading:false}))
      }

    
    }).catch(err =>{console.log(err)})
return'';

}  
    )

}
componentDidMount(){
this.GetStatus();

}
  render(){
      const { user, MapConfig, country } = this.props;
const Loading=()=>{
var l = this.state.fetch_loading
if(l){
return ( <div  className="loading_div" style={{width:this.state.fetch_progress+"%"}}>
  <div className="tab"></div>
</div>)
}else{
return('');
}

}
 
const {currentKey,currentCountry} = country ;
      return (
        <div>

<Loading/> 
    <Row justify="center">
    <Col  className="Map" style={{overflow:"hidden"}} span={24}>
        <Map/>
    </Col>
<Col className="content"  justify="center" align="middle"  xs={24} xm={24} md={{span:24}} lg={{span:22,offset:1}} xl={{span:20,offset:2}}>
 <Row     justify="center" align="middle" >
   <Col md={24} sm={24} className="content-1" >
     <Router>
    <Switch>
    <Status/>
    </Switch>  </Router>
   </Col>
  </Row>
 </Col>
 <Col justify="center" align="middle"  xs={24} xm={24} md={{span:24}} lg={{span:22,offset:1}} xl={{span:20,offset:2}}>
 <Row     justify="center" align="middle" >
   <Col md={24} sm={24} className="copyright" >
   {__("made with")} <HeartFilled style={{color:"#FF3B3B"}} /> {__("by")} <a target="_blank" title="@tawfekmt" href="https://instagram.com/tawfekmt" rel="nofollow noindex noopener noreferrer">@tawfekmt</a>
   </Col>
   <br/>
   <br/>

  </Row>
 </Col>
 

</Row>
 
        </div>
      );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(AppPage)