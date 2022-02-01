
import './styles/App.css';
import detectBrowserLanguage from 'detect-browser-language'
import Cookies from 'universal-cookie';

 function Lang2set () {
    const cookies = new Cookies();
    const cookie_language = cookies.get('language');
    var lang2set = 'en' ;
     if(cookie_language===undefined){
        if( detectBrowserLanguage().toLowerCase().indexOf("ar")>-1){
            cookies.set('language','ar');
            lang2set = 'ar' ;
        }else{
            cookies.set('language','en');
            lang2set = 'en' ;
    
        }
    }else{
       if(cookie_language.toLowerCase().indexOf("ar")>-1){
           lang2set = "ar" ;
       }else{
           lang2set ="en" ;
       }
    }

    //Return current website language
  return (lang2set) ;

 };

export default Lang2set;