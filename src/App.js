import React from 'react';
import './App.css';
import { withTranslation } from 'react-i18next';
  
import Lang2set from './lang2set'
//import Mapo from './map';
import FullMap from './fullmap'
 
 const dir_type = (Lang2set()==="en")?'ltr':'rtl';

const App = ({t}) => (
    (<div dir={dir_type} >
  <FullMap/>

    </div>)
);

export default withTranslation()(App);