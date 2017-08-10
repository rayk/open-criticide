/* eslint-disable no-undef,no-console,func-names */
import { Application } from 'spectron';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('Application launch:', function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: 'out/Criticide-darwin-x64/Criticide.app/Contents/MacOS/Criticide',
    });
    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('should open main application window.', async () => {
    const { client, browserWindow } = this.app;
    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBeDefined();
  });

  it('should only create one window.', async () => {
    const { client } = this.app;
    await client.waitUntilWindowLoaded();
    await delay(500);
    const windowCount = await client.getWindowCount();
    expect(windowCount).toEqual(1);
  });

  it('has a title of the window the product name.', async () => {
    const { client, browserWindow } = this.app;
    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('Criticide');
  });

  it('should not have warning, errors, etc in the rendering logs.', async () => {
    const { client } = this.app;
    const logs = await client.getRenderProcessLogs();
    logs.forEach(log => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });
});
