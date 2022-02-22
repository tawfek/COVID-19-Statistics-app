import { message } from "antd";
import axios from "axios";
import { getCountry, setCountry } from "../components/helpers";
import __ from "../localization/tr";
import { IPINFO_DOT_IO_TOKEN } from "./endpoint";

const detectCountry = () => {
  return (dispatch) => {
    try {
      axios
        .get(`https://ipinfo.io/?token=${IPINFO_DOT_IO_TOKEN}`)
        .then(async (response) => {
          response = await response.data;
          try {
            let currentCountry = response.country;
            let detectCountry = getCountry(currentCountry);
            if (detectCountry !== -1) {
              setCountry(currentCountry);
            }
          } catch (err) {
            console.error(err);
            message.error(__("unexpected-error111"));
          }
        })
        .catch(
          (err) => console.error(err) + message.error(__("unexpected-error"))
        );
    } catch (e) {
      console.error(e);
      message.error(__("unexpected-error"));
    }
  };
};
export default detectCountry;
