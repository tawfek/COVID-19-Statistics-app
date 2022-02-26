import { message } from "antd";
import axios from "axios";
import { getCountry } from "../components/helpers";
import __ from "../localization/tr";
import { IPINFO_DOT_IO_TOKEN } from "../config";

const detectCountry = async (callback) => {
  try {
    let Country = await axios
      .get(`https://ipinfo.io/?token=${IPINFO_DOT_IO_TOKEN}`)
      .then(async (response) => {
        response = await response.data;
        try {
          let currentCountry = response.country;
          let detectCountry = getCountry(currentCountry);
          callback(detectCountry.currentCountry);
        } catch (err) {
          message.error(__("unexpected-error"));
        }
      })
      .catch((err) => {
        message.error(__("unexpected-error"));
        return Promise.reject(err);
      });
    return Country;
  } catch (e) {
    console.error(e);
    message.error(__("unexpected-error"));
    return -1;
  }
};
export default detectCountry;
