import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { pdfjs } from 'react-pdf';
import muiTheme, { palette } from './muiTheme';
import useLocalStorage from './utils/hooks/useLocalStorage';

import { LanguageContext } from './context/languageContext';
import UserContext from './context/userContext';
import AdminPayloadContext from './context/adminPayloadContext';
import Router from './Pages/Router';
import { siteTitle, favIconPath, siteDescription, canonicalUrl } from './config';

import './App.css';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  const [language, setLanguage] = useState(user?.meta?.language ?? 'en');
  const [adminPayload, setAdminPayload] = useState({});
  const theme = createMuiTheme(muiTheme);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <MuiThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <AdminPayloadContext.Provider value={{ adminPayload, setAdminPayload }}>
            <LanguageContext.Provider value={{ language, toggleLanguage: setLanguage }}>
              <Helmet>
                <html lang={language} amp />
                <meta charSet="utf-8" />
                <meta name="description" content={siteDescription} />
                <meta name="theme-color" content={palette.primary.main} />
                <title>{siteTitle}</title>
                <link rel="icon" href={favIconPath} />
                <link rel="canonical" href={canonicalUrl} />
              </Helmet>
              <Router />
            </LanguageContext.Provider>
          </AdminPayloadContext.Provider>
        </UserContext.Provider>
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
