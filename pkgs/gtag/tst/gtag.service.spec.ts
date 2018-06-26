/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { isMatch } from 'lodash';

import { CfgModule } from '@nwx/cfg';
import { LogModule } from '@nwx/logger';

import { GtagModule } from '../src/gtag.module';
import { GtagService } from '../src/gtag.service';

describe('GtagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CfgModule.forRoot(), LogModule, GtagModule]
    });
  });

  it(
    'should be created',
    inject([GtagService], (service: GtagService) => {
      expect(service).toBeTruthy();
    })
  );
});
