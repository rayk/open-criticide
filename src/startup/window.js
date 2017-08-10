import { BrowserWindow } from 'electron';

const windowStateKeeper = require('electron-window-state');
const assert = require('assert-plus');

/**
 * Returns the applications main window.
 *
 * The window which is an electron browser window is configured and contains a Listener that
 * saves changes to size and position of the window.
 *
 * @param {Object} appCtx - Application Context.
 * @return {Electron.BrowserWindow}
 */
function appWindow(appCtx) {
  assert.object(appCtx, 'appCtx');

  const appConfig = appCtx.app;
  const platformConfig = appCtx.platform;

  assert.object(appConfig, 'appCtx:app');
  assert.object(platformConfig, 'appCtx:platform');

  const state = windowStateKeeper({
    defaultHeight: appCtx.app.windowDefaultHeight,
    defaultWidth: appCtx.app.windowDefaultWidth,
  });

  const windowProperties = {
    background: '#F3F3F3',
    height: state.height,
    width: state.width,
    minHeight: appConfig.windowMinHeight,
    minWidth: appConfig.windowMinWidth,
    x: state.x,
    y: state.y,
    show: false,
    title: appConfig.windowTitle,
    webPreferences: {
      devTools: platformConfig.devMode,
      experimentalFeatures: appConfig.experimentalFeatures,
    },
  };

  const createdWindow = new BrowserWindow(windowProperties);
  state.manage(createdWindow);

  return createdWindow;
}

export default appWindow;
