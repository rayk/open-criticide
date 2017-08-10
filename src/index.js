/**
 * @desc Application Startup.
 */
/* eslint-disable global-require */
import { app } from 'electron';
import { enableLiveReload } from 'electron-compile';
import appCtx from './context/appCtx';
import attachedDevTools from './startup/devTools';
import enableReporter from './startup/reporter';
import envProps from './context/envProps';
import window from './startup/window';

const config = require('./context/config.json');

let aCtx;
let currentWindow;

const popMainWindow = ctx => {
  const win = window(ctx);
  win.loadURL(`file://${__dirname}/${ctx.app.windowMainContent}`);
  win.once('ready-to-show', () => {
    currentWindow = win;
    win.show();
  });
  win.on('closed', () => {
    currentWindow = null;
  });

  require('./startup/menu');

  return win;
};

/**
 * @listens {ready} Application Initialised Complete.
 */
app.on('ready', () => {
  aCtx = appCtx(envProps, config);
  const reporter = enableReporter(aCtx);
  const win = popMainWindow(aCtx);
  if (aCtx.platform.devMode) {
    enableLiveReload({ strategy: 'react-hmr' });
    attachedDevTools(win, aCtx)
      .then(() => {
        aCtx.logger.info('Development Tools Attached.');
      })
      .catch(err => {
        const msg = 'development tools failed to attach:';
        aCtx.logger.error(`${msg} ${err}`);
        reporter.critical(msg, err);
      });
    reporter.debug('Control Message - All is well with reporter.');
  }
});

/**
 * @listens {window-all-closed} All the app's windows have been closed.
 */
app.on('window-all-closed', () => {
  if (!aCtx.isRunningOnMac) {
    app.quit();
  }
});

/**
 * @listens {active} Apps window is being made active.
 */
app.on('activate', () => {
  if (currentWindow === null) {
    popMainWindow(aCtx);
  }
});
