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
  production: false,
  log: {
    // log level (application-wide)
    level: LogLevels.debug
  },
  gtag: {
    // estimate time of http request between client -> server (greater than zero)
    networkDelay: 1,
    // few seconds to make the randomizer work. backend can overwrite
    expiryLeeway: 5
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
// In your app.module.ts

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

    const someToken = 'some-gtag-token-received-from-server'; // <part-1>.<part-2>.<part-2>
    const payload = this.gtag.getPayload(someToken);
    const isExpired = this.gtag.isExpired(payload);
    if (!isExpired) {
      const userId = payload.sub;
      const nextRefresh = this.gtag.getRefreshTime(payload);
      setTimeout(() => {
        // connect to the server to get a new token
      }, nextRefresh * 1000);
    }
  }
}
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
