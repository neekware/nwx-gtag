import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CfgModule } from '@nwx/cfg';
import { LogModule } from '@nwx/logger';

import { GtagModule } from 'pkgs/gtag';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CfgModule.forRoot(environment),
    LogModule,
    GtagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
