/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { get, merge } from 'lodash';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { CfgService, AppCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';

import { DefaultGtagCfg } from './gtag.defaults';
import { GtagModule } from './gtag.module';
import { GtagPageViewParams, GtagEventParams } from './gtag.types';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GtagService {
  options: AppCfg = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cfg: CfgService,
    private log: LogService
  ) {
    this.options = merge({ gtag: DefaultGtagCfg }, this.cfg.options);
    if (this.options.gtag.trackingId) {
      this.loadScript();
      this.initScript();
      this.log.debug(`GtagService ready ... (${this.options.gtag.trackingId})`);
      if (this.options.gtag.autoPageTrack) {
        this.enablePageView();
      }
    }
  }

  private initScript() {
    const id = this.options.gtag.trackingId;
    const enabled = this.options.gtag.autoPageTrack;
    const tag = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', { 'send_page_view': ${enabled} });
    `;
    const elNode = Object.assign(document.createElement('script'), {
      text: tag
    });
    document.body.appendChild(elNode);
  }

  private loadScript() {
    const url = `${this.options.gtag.gtagUrl}?id=${this.options.gtag.trackingId}`;
    if (!document.querySelectorAll(`[src="${url}"]`).length) {
      const elNode = Object.assign(document.createElement('script'), {
        type: 'text/javascript',
        src: url,
        async: true
      });
      document.body.appendChild(elNode);
    }
  }

  private enablePageView() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => route.firstChild),
        switchMap(route => route.data),
        map(data => get(data, 'title', this.options.appName)),
        tap(title => {
          this.trackPageView({ page_title: title });
        })
      )
      .subscribe();
  }

  trackPageView(params?: GtagPageViewParams) {
    params = {
      ...{
        page_path: this.router.url,
        page_location: window.location.href,
        page_title: this.options.appName
      },
      ...params
    };
    if (typeof gtag === 'function') {
      try {
        gtag('config', this.options.gtag.trackingId, params);
      } catch (err) {
        this.log.error('Failed to track page view', err);
      }
    } else {
      this.log.debug('skip page track. gtag not ready yet ...');
    }
  }

  trackEvent(name: string, params: GtagEventParams = {}) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', name, params);
      } catch (err) {
        console.error('Failed to track event', err);
      }
    } else {
      this.log.debug('skip event track. gtag not ready yet ...');
    }
  }
}
