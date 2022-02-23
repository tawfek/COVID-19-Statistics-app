import { message } from "antd";
import { GetDays, refreshCurrentCountry } from "../components/helpers";
import __ from "../localization/tr";
import { setCountryStatistics } from "../store/actions";
import { ENDPOINT } from "./endpoint";
import * as Countries from "../countries.json";
import axios from "axios";

const getLastWeekData = (days = 7, includeToday = true) => {
  return async (dispatch) => {
    let Dates = GetDays(days, includeToday); // get last week data , return Date array ["1990-01-01", "1990-01-02" ...]
    let countries = [];

    Countries.countries.map((country) => {
      countries.push({
        name: country.country.search,
        data: [],
      });
      return true;
    });

    Dates.map(async (date,key) => {
      await axios
        .get(`${ENDPOINT}?d=${date}`)
        .then(async (response) => {
          response = await response.data;
          try {
            response.map(async (country) => {
              let data = await country.response[0];
              if (data) {
                let { day, cases, deaths, tests } = data;
                countries.map((country, key) => {
                  if (data.country === country.name) {
                    countries[key].data.push({
                      day: day,
                      cases: cases,
                      deaths: deaths,
                      tests: tests,
                    });
                  }
                  return true;
                });
              }
     

              return true;
            });
          } catch (error) {
            console.log(error);
            message.error(__("unexpected-error"));
          }
        })

        .catch((error) => {
          console.log(error);
          message.error(__("unexpected-error"));
        });

      if((key) ===Dates.length-1){
        dispatch(setCountryStatistics(countries));
        refreshCurrentCountry();

      }
        return "";
      });
  };
};

export default getLastWeekData;
