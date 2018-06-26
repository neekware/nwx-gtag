import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  // app name
  appName: '@nwx/gtag',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: true,
  log: {
    // log level (application-wide)
    level: LogLevels.debug
  },
  gtag: {
    // google tracking id (UA-XXXXX-Y)
    trackingId: null,
    // track page view on start
    autoPageView: false
  }
};
