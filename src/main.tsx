import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import TimeAgo from 'javascript-time-ago';
import ReactGA from 'react-ga4';
import es from 'javascript-time-ago/locale/es';

import App from './app/app';

ReactGA.initialize('G-R63LDGFFTW');
TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
