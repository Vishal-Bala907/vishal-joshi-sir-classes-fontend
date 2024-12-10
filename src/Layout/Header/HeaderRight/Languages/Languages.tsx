import { Href } from "@/Constant";
import { LanguagesData } from "@/Data/Applications/Layout/HeaderData";
import { useAppDispatch } from "@/Redux/Hooks";
import { setLayoutType } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { LanguageDataType } from "@/Types/LayoutTypes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Languages = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;
  const [selectedLang, setSelectedLang] = useState<any>({});
  const changeLanguage = (lng: LanguageDataType) =>
    i18n.changeLanguage(lng.icon);
  const [langDropdown, setLangDropdown] = useState(false);
  const languageSelection = () => setLangDropdown(!langDropdown);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setSelectedLang(LanguagesData.find((data) => data.icon == currentLanguage));
    if (currentLanguage === "ae") dispatch(setLayoutType("rtl"));
    else dispatch(setLayoutType("ltr"));
  }, [currentLanguage]);
  return (
    <li className="custom-dropdown d-sm-block d-none">
      <div className={`translate_wrapper ${langDropdown ? "active" : ""}`}>
        <div className="current_lang" onClick={languageSelection}>
          <a className="lang" href={Href}>
            <i className={selectedLang.logo} />
            <h6 className="lang-txt f-w-700">{selectedLang.icon}</h6>
          </a>
        </div>
        <ul
          className={`custom-menu profile-menu language-menu py-0 more_lang ${
            langDropdown ? "active" : ""
          }`}
        >
          {LanguagesData?.map((item, i) => (
            <li
              className="d-block"
              key={i}
              onClick={() => changeLanguage(item)}
            >
              <a
                className="text-decoration-none"
                data-lng={item.title}
                href={Href}
              >
                <i className={item.logo} />
                <div className="lang-text">{item.title}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Languages;
