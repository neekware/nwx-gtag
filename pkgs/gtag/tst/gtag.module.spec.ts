/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { GtagModule } from '../src/gtag.module';

describe('GtagModule', () => {
  let GtagModule: GtagModule;

  beforeEach(() => {
    GtagModule = new GtagModule();
  });

  it('should create an instance', () => {
    expect(GtagModule).toBeTruthy();
  });
});
