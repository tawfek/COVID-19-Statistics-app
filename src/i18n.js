import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Lang2set from './lang2set'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "dir":"ltr",
      "text-align":"left",
      "loading":"Loading...",
      'Total cases':"Total Cases",
      "active cases":"Active Cases",
      "Tests":"Test",
      "Recovered Cases":"Recovered Cases",
      "Recovred":"Recovred",
      "Active Cases":"Active Cases",
      "Deaths":"Deaths",
      "New":"New",
      "Critical Cases":"Critical Cases",
      "last update":"Last update",
      "Settings":"Settings",
      'cure':"Cure Precent",
      'cure desc':'The remaining percentage to eliminate the COVID-19 virus',
      'data loading':'Data is loading...',
      "chart-title":"Statistics in charts",
      "chart-info":"Charts, statistics, sick and recovered cases, and deaths during the past 7 days.",
      "percent-title":"Percentage of cases",
      "percent-info":"The percentage of sick, recovered and death cases during the past seven days.",
      "history-title":"Digital statistics of Coronavirus",
      "history-info":"Digital statistics for patients infected, recovered, and Coronavirus deaths for the last few days",
      "header title":"The latest statistics for infected people  with coronavirus in ",
      "header title noncountry":"Latest Coronavirus Statistics for",
      "header info":"The latest statistics of the infected, recovered and dead from COVID-19 Coronavirus in ",
      "with charts":"with charts and world map.",
      "page small title":"Coronavirus (COVID-19) virus in Middle east",
      "page full title":"The latest statistics of the infected, recovered and dead from COVID-19 Coronavirus in the Middle East countries",
      "page title":"The last stats infected with Coronavirus for the countries of the Middle East",
      "made with":"Made with",
      "by":"By"
    }
  },
  ar:{
      translation:{
          "dir":"rtl",
          "text-align":"right",
          "loading":"جاري التحميل...",
          'Total Cases':"جميع المصابين",
          "active cases":"المصابين الحاليين",
          "Tests":"الفحوصات الطبية",
          "Recovered Cases":"المتعافيين",
          "Recovred":"المتعافيين",
          "Deaths":"المتوفيين",
          "New":"حالات جديدة",
          "Critical Cases":"الحالات الخطرة",
          "last update":"اخر تحديث ",
          "Settings":"الاعدادات",
          'Cure':'نسبة التعافي ',
          'cure desc':'النسبة المئوية المتبقية للقضاء على فيروس كورونا',
          'data loading':'جاري تحميل البيانات...',
          "chart-title":"الاحصائيات في الرسوم البيانية",
          "chart-info":"الرسوم البيانية والاحصائيات للحالات المرضية و المتعافين وحالات الوفاة خلال الأيام السبعة الماضية.",
          "percent-title":"النسبة المئوية للحالات",
          "percent-info":"النسبة المئوية لحالات المرض والشفاء والوفاة خلال الأيام السبعة الماضية.",
          "history-title":"الاحصائيات الرقمية للمصابين بفيروس كورونا",
          "cure":"النسبة المئوية للتعافي",
          "history-info":"الاحصائيات الرقمية للحالات المصابة المرضى ، المتعافين و حالات الموت بفيروس كورونا",
          "header title":"اخر احصائيات المصابين والمتعافيين والموتى لفايروس كورونا في",
          "header title noncountry":"اخر احصائيات المصابين والمتعافيين والموتى لفايروس كورونا في ",
          "header info":"اخر احصائيات فايروس كورونا COVID-19 في",
          "with charts":"مع خريطة العالم والرسوم البيانية",
      "page small title":"فايروس كورونا في الشرق الاوسط",
          "page full title":" اخر احصائيات المصابين والمتعافيين والموتى لفايروس كورونا COVID-19 لدول الشرق الاوسط ",
          "page title":"اخر احصائيات المصابين بفايروس كورونا لدول الشرق الاوسط",
          "made with":"عٌمل بـ",
          "by":"بواسطة "
      }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
   .init({
    resources,
    lng: Lang2set() ,
    fallbackLng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;