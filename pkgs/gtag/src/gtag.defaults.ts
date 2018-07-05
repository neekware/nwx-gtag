/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { GtagCfg } from './gtag.types';

export const DefaultGtagCfg: GtagCfg = {
  // ability to disable tracking (ex; dev / staging mode)
  isEnabled: false,
  // google tracking id (UA-XXXXX-Y)
  trackingId: null,
  // track page view (route change) automatically on app start
  routeChangeTracking: false,
  // gtag.js url
  gtagUrl: 'https://www.googletagmanager.com/gtag/js'
};
