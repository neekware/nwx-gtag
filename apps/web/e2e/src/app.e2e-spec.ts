import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to @nwx/gtag!');
    console.log(page);
  });

  it('should load gtag script', () => {
    page.navigateTo();
    expect(page.getScriptSrc()).toContain('gtag');
  });
});
