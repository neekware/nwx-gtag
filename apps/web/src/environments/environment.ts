import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  // app name
  appName: '@nwx/gtag',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: false,
  log: {
    // log level (application-wide)
    level: LogLevels.debug
  },
  gtag: {
    // tracking is enabled
    isEnabled: true,
    // google tracking id (UA-XXXXX-Y)
    trackingId: 'UA-123456-2',
    // track page view on start
    routeChangeTracking: false
  }
};
