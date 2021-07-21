import { useContext } from 'react';
import { LanguageContext } from '../../context/languageContext';
import config from '../../config';

const languages = config?.availableLanguages ?? ['en', 'fr', 'it'];

const useTranslate = ({ namespace, resources }) => {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    const isLanguageValid = languages.some((lang) => language === lang);

    const langResource = resources[language.toLocaleLowerCase()][key] ?? (
      <span
        style={{
          color: 'white',
          backgroundColor: 'rgb(150,0,0)',
          border: '2px solid red',
          padding: '2px',
          fontSize: '14px',
        }}>
        {`Missing key {${key}} in ${namespace}`}
      </span>
    );

    return isLanguageValid ? langResource : 'Invalid language';
  };

  return { t, language, languages };
};

export default useTranslate;
