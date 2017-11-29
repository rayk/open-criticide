/**
 * @desc Application Startup.
 */
/* eslint-disable global-require */
import { app } from 'electron';
import { enableLiveReload } from 'electron-compile';
import { autoUpdater } from 'electron-updater';
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
  autoUpdater.checkForUpdates();

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

autoUpdater.on('checking-for-update', () => {
  const msg = 'Checking for update...';
  aCtx.logger.info(`${msg}`);
});
autoUpdater.on('update-available', (info) => {
  const msg = 'Update available..';
  aCtx.logger.info(`${msg} ${info}`);
});
autoUpdater.on('update-not-available', (info) => {
  const msg = 'Update not available..';
  aCtx.logger.info(`${msg} ${info}`);
});
autoUpdater.on('error', (err) => {
  const msg = 'Error in auto-updater..';
  aCtx.logger.info(`${msg} ${err}`);
});
autoUpdater.on('download-progress', (progressObj) => {
  let msg = 'Download speed: ' + progressObj.bytesPerSecond;
  msg = msg + ' - Downloaded ' + progressObj.percent + '%';
  msg = msg + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  aCtx.logger.info(`${msg} `);

});
autoUpdater.on('update-downloaded', (info) => {
  const msg = 'Update downloaded';
  aCtx.logger.info(`${msg} ${info}`);
});
