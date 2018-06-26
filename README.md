# @nwx/gtag

**A simple GTAG module for Angular applications**

[![status-image]][status-link]
[![version-image]][version-link]
[![coverage-image]][coverage-link]
[![download-image]][download-link]

# How to install

    npm i @nwx/gtag |OR| yarn add @nwx/gtag

# How to use

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform } from '@nwx/cfg';
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
    // google tracking ID for domain
    trackingId: 'UA-XXXXXX-Y',
    // track page view on start (on route changes)
    autoPageTrack: true
  }
};
```

```typescript
// In your app.module.ts

import { CfgModule } from '@nwx/cfg';
import { LoggerModule } from '@nwx/logger';
import { GtagModule } from '@nwx/gtag';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CfgModule.forRoot(environment), // make the environment injectable
    LoggerModule,
    GtagModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// In your app.component.ts

import { Component } from '@angular/core';
import { CfgService, DefaultCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';
import { GtagService } from '@nwx/gtag';

@Component({
  selector: 'app-root',
  template: `<h1>Welcome to {{ title }}!</h1>`
})
export class AppComponent {
  title = 'Neekware';
  options = {};
  constructor(public cfg: CfgService, public log: LogService, public gtag: GtagService) {
    this.title = this.cfg.options.appName;
    this.log.info('AppComponent loaded ...');
    // all route changes are tracked automatically from now on
    this.trackDetailedEvent();
    this.trackEvent();
  }

  trackDetailedEvent() {
    // example of event with params
    gtag.trackEvent('home-page', {
      event_category: 'SEO',
      event_label: 'Page loaded, anonymous user'
    });
  }

  trackEvent() {
    // example of event without params
    gtag.trackEvent('home-page-visit');
  }
}
```

# Advanced usage

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  appName: '@nwx/gtag',
  // ...
  gtag: {
    // google tracking ID for domain
    trackingId: 'UA-XXXXXX-Y',
    // track page view on start (on route change)
    autoPageTrack: false
  }
};
```

```typescript
// track page view manually with specific options
gtag.trackPageView({
  page_path: '/',
  page_title: 'Home Page',
  page_location: 'http://neekware.com'
});

// or with default options
gtag.trackPageView();

// where defaults are:
// page_title = [active-route.data.title] | [environment.appName]
// page_path = router.url

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, data: { title: 'Home page' } }
];
```

# Running the tests

To run the tests against the current environment:

    npm run ci:all

# License

Released under a ([MIT](https://github.com/neekware/nwx-gtag/blob/master/LICENSE)) license.

# Version

X.Y.Z Version

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes

[status-image]: https://secure.travis-ci.org/neekware/nwx-gtag.png?branch=master
[status-link]: http://travis-ci.org/neekware/nwx-gtag?branch=master
[version-image]: https://img.shields.io/npm/v/@nwx/gtag.svg
[version-link]: https://www.npmjs.com/package/@nwx/gtag
[coverage-image]: https://coveralls.io/repos/neekware/nwx-gtag/badge.svg
[coverage-link]: https://coveralls.io/r/neekware/nwx-gtag
[download-image]: https://img.shields.io/npm/dm/@nwx/gtag.svg
[download-link]: https://www.npmjs.com/package/@nwx/gtag
