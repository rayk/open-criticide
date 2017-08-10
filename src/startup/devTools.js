const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
  REACT_PERF,
} = require('electron-devtools-installer');

/**
 * Attaches development tools onto the window that is passed in.
 *
 * Once attached opens the development tools window. _Verbosely logs it progress_.
 * @param {Object} window - Electron Browser Window
 * @param {Object} appCtx - Application Context
 * @return {Promise.<void>}
 */
async function attachedDevTools(window, appCtx) {
  const log = appCtx.logger;
  log.info('** ATTACHING DEVELOPMENT MODE TOOLS **');
  log.info(`App File Path: \t${appCtx.path.appFiles}`);
  log.info(`Win Content: \t/${appCtx.app.windowMainContent}`);
  log.info(`NODE_NDEBUG: \t${process.NODE_NDEBUG}`);
  log.info(`isOnMac: \t${appCtx.isRunningOnMac}`);
  log.info(`isOnLinux: \t${appCtx.isRunningOnLinux}`);
  log.info(`ProcsPlatf: \t${process.platform}`);

  const logPrefix = 'Extension Added:';
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => log.info(`${logPrefix} ${name}.`))
    .catch(err => log.error(`Was adding React Dev Tools. ${err}`));
  installExtension(REDUX_DEVTOOLS)
    .then(name => log.info(`${logPrefix} ${name}.`))
    .catch(err => log.error(`Was adding Redux Dev Tools. ${err}`));
  installExtension(REACT_PERF)
    .then(name => log.info(`${logPrefix} ${name}.`))
    .catch(err => log.error(`Was adding React Perf Tools. ${err}`));

  window.webContents.openDevTools();
}

export default attachedDevTools;
