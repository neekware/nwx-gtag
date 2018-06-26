/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { GtagCfg } from './gtag.types';

export const DefaultGtagCfg: GtagCfg = {
  // google tracking id (UA-XXXXX-Y)
  trackingId: null,
  // track page view on start
  autoPageTrack: false,
  // gtag.js url
  gtagUrl: 'https://www.googletagmanager.com/gtag/js'
};
