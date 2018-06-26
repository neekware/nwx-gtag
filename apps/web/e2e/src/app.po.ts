import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getScriptSrc() {
    return element(by.xpath(`//script[contains(@src, 'UA-')]`)).getAttribute('src');
  }
}
