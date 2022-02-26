import { message } from "antd";
import __ from "../localization/tr";
import { setFetchedData } from "../store/actions";
import { ENDPOINT } from "../config";
import * as Countries from "../countries.json";
import axios from "axios";

const GetCountriesData = () => {
  return async (dispatch) => {
    let fullData = [];
    Countries.countries.forEach(async (country) => {
      let countryId = country.country.search;

      try {
        await axios.get(`${ENDPOINT}?country=${countryId}`).then((response) => {
          response = response.data;
          if (response[0].response !== undefined) {
            fullData.push({
              country: countryId,
              response: response[0].response[response[0].response.length - 1],
            });
          }
        });
      } catch (error) {
        console.error(error);
        message.error(__("unexpected-error"));
      }
    });
    dispatch(
      setFetchedData({
        data: fullData,
        isLoaded: true,
      })
    );
  };
};

export default GetCountriesData;
