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
import { GtagPageViewParams } from './gtag.types';

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
    this.options = merge({ gtag: DefaultGtagCfg }, cfg.options);
    if (this.options.gtag.trackingId) {
      this.initScript().then(() => {
        this.loadScript().then(() => {
          log.debug(`GtagService ready ... (${this.options.gtag.trackingId})`);
        });
      });
      if (this.options.gtag.autoPageView) {
        this.enablePageView();
      }
    }
  }

  private initScript(): Promise<any> {
    return new Promise(resolve => {
      const tag = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${this.options.GoogleAnalyticsId}', { 'send_page_view': ${
        this.options.gtag.autoPageView
      } });
      `;
      const elNode = Object.assign(document.createElement('script'), {
        text: tag,
        onload: resolve
      });
      document.body.appendChild(elNode);
    });
  }

  private loadScript(): Promise<any> {
    return new Promise(resolve => {
      const url = `${this.options.gtagUrl}?id=${this.options.GoogleAnalyticsId}`;
      if (document.querySelectorAll(`[src="${url}"]`).length) {
        resolve();
      } else {
        const elNode = Object.assign(document.createElement('script'), {
          type: 'text/javascript',
          src: url,
          onload: resolve
        });
        document.body.appendChild(elNode);
      }
    });
  }

  private enablePageView() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          this.pageView();
        })
      )
      .subscribe();
  }

  pageView(params?: GtagPageViewParams) {
    params = {
      ...{
        page_path: this.router.url,
        page_location: window.location.href,
        page_title: this.getTitle() || this.options.appName
      },
      ...params
    };
    try {
      gtag('config', this.options.gtag.trackingId, params);
    } catch (err) {
      this.log.error('Failed to track page view', err);
    }
  }

  getTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map(data => get(data, 'title'))
    );
  }
}
