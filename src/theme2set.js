
import './App.css';
import Cookies from 'universal-cookie';

 function Theme2set () {
    const cookies = new Cookies();
    const cookie_theme = cookies.get('theme');
    var theme2set = 'light' ;
     if(cookie_theme===undefined){
        cookies.set('theme','light');
        theme2set = "light"
    }else{
       if(cookie_theme.toLowerCase().indexOf("dark")>-1){
           theme2set = "dark" ;
       }else{
           theme2set ="light" ;
       }
    }

    //Return current website language
  return (theme2set) ;

 };

export default Theme2set;