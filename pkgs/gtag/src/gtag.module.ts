/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtagService } from './gtag.service';

@NgModule({
  imports: [CommonModule]
})
export class GtagModule {
  /**
   * Constructor - Ensures a singleton copy
   * @param parentModule parent module that imports the module
   */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: GtagModule
  ) {
    if (parentModule) {
      throw new Error('GtagModule is already loaded. Import it in the AppModule only');
    }
  }
}
