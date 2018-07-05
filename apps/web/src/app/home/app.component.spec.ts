import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CfgModule, AppCfg, CFG_OPTIONS } from '@nwx/cfg';

import { LogModule } from '@nwx/logger';

import { Observable, of as observableOf } from 'rxjs';

import { GtagModule } from 'pkgs/gtag';

import { HomeComponent } from './home.component';

const AppEnv: AppCfg = {
  appName: '@nwx/gtag',
  production: false,
  gtag: {
    trackingId: 'UA-123456-2',
    routeChangeTracking: false
  }
};

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,
        CfgModule.forRoot(AppEnv),
        LogModule,
        GtagModule
      ],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  it('should create the @nwx/gtag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.debugElement.componentInstance;
    expect(home).toBeTruthy();
  }));

  it(`should have as title '@nwx/gtag'`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.debugElement.componentInstance;
    expect(home.title).toEqual('@nwx/gtag');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to @nwx/gtag!');
  }));

  it('should load gtag script', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const options = fixture.debugElement.componentInstance.gtag.options.gtag;
    expect(options.gtagUrl.length).toBeGreaterThan(0);
    expect(options.trackingId).toContain('UA');
  }));
});
