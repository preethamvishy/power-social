import { TwitterAngularPage } from './app.po';

describe('twitter-angular App', () => {
  let page: TwitterAngularPage;

  beforeEach(() => {
    page = new TwitterAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
