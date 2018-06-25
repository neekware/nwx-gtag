import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CfgModule } from '@nwx/cfg';
import { LogModule } from '@nwx/logger';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { GtagModule } from 'pkgs/gtag';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CfgModule.forRoot(environment), LogModule, GtagModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
