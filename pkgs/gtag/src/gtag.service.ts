/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Injectable } from '@angular/core';

import { get, merge } from 'lodash';
import { Base64 } from 'js-base64';
import { CfgService, AppCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';

import { DefaultGtagCfg } from './gtag.defaults';
import { GtagModule } from './gtag.module';

/**
 * An injectable class that handles GTAG service
 */
@Injectable({
  providedIn: 'root'
})
export class GtagService {
  private _options: AppCfg = null;

  /**
   * Class constructor
   * @param options an optional configuration object
   */
  constructor(private cfg: CfgService, private log: LogService) {
    this._options = merge({ gtag: DefaultGtagCfg }, cfg.options);
    this.log.debug('GtagService ready ...');
  }

  /**
   * Gets the payload portion of a GTAG token
   * @param token GTAG token (base64 encrypted)
   * @returns a payload object or null if decode fails
   */
  getPayload(token: string): any {
    let parts = [];

    try {
      parts = token.split('.');
      if (parts.length !== 3) {
        throw Error('GTAG must have 3 parts');
      }
    } catch (e) {
      this.log.error(e.message);
      return null;
    }

    try {
      const decoded = Base64.decode(parts[1]);
      const payload = JSON.parse(decoded);
      return payload;
    } catch (e) {
      this.log.error('Cannot decode the token');
    }

    return null;
  }

  /**
   * Tells if a GTAG is token is expired
   * @param payload GTAG payload object
   * @return true if GTAG is already expired, else false
   */
  isExpired(payload: any): boolean {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    if (payload) {
      const offset = (parseInt(payload.lee, 10) || this._options.gtag.expiryLeeway) * 1000;
      const now = this.utcSeconds();
      const expiry = this.utcSeconds(payload.exp);
      const expired = now > expiry + offset;
      return expired;
    }
    return true;
  }

  /**
   * Calculates the next refresh time
   * @param payload GTAG payload object
   * @param offset if true, a random time is added to the refresh time
   * where networkDelay < random < leeway
   * @returns total number of seconds till expiry or 0 if token is expired
   */
  getRefreshTime(payload: any, offset = true): number {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    if (payload && !this.isExpired(payload)) {
      const now = this.utcSeconds();
      const expiry = this.utcSeconds(payload.exp);
      const refresh = Math.floor((expiry - now) / 1000);
      const random = this.getRandomOffset(payload);
      const time = offset ? refresh + random : refresh;
      return time;
    }
    return 0;
  }

  /**
   * Calculates a random number where networkDelay < random < leeway
   * @param payload GTAG payload object
   * @returns a random total number of seconds
   */
  private getRandomOffset(payload: any): number {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    const leeway = get(
      payload,
      'leeway',
      get(payload, 'lee', this._options.gtag.expiryLeeway)
    );
    const range = {
      lower: 1,
      upper: leeway - this._options.gtag.networkDelay || 2
    };
    return Math.floor(Math.random() * range.upper + range.lower);
  }

  /**
   * Calculates the UTC value of date/time in seconds
   * @param input date/time in seconds
   * @returns UTC value of date/time in seconds
   */
  private utcSeconds(input?: number): number {
    return input ? new Date(0).setUTCSeconds(input).valueOf() : new Date().valueOf();
  }

  get options() {
    return this._options;
  }
}
