/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { GtagCfg } from './gtag.types';

/**
 * Default configuration - GTAG module
 */
export const DefaultGtagCfg: GtagCfg = {
  // google gtag id
  gtagId: null,
  // track page view on automatically on start
  pageView: false
};
