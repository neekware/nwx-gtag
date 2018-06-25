import { Component } from '@angular/core';

import { CfgService, DefaultCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';

import { GtagService } from 'pkgs/gtag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Neekware';
  options = {};
  constructor(public cfg: CfgService, public log: LogService, public gtag: GtagService) {
    this.title = this.cfg.options.appName;
    this.log.info('AppComponent loaded ...');
  }
}
