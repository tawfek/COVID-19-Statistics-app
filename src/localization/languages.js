import arabicStrings from "react-timeago/lib/language-strings/ar";
import turkishStrings from "react-timeago/lib/language-strings/tr"
import englishStrings from "react-timeago/lib/language-strings/en"
import ch from "react-timeago/lib/language-strings/zh-CN"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const Languages = [
  {
    name: "Turkish",
    key: "tr",
    formater: buildFormatter(turkishStrings)
  },
  {
    name: "English",
    key: "en",
    formater: buildFormatter(englishStrings)

  },
  {
    name: "Chinese",
    key: "cn",
    formater: buildFormatter(ch)

  },
  {
    name: "العربية",
    key: "ar",
    formater: buildFormatter(arabicStrings)
  },
];
