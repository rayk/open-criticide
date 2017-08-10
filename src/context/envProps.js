import { app, autoUpdater } from 'electron';

/**
 * Current runtime Environmental Properties which are available after initialisation.
 * @type {{appName: string, appVersion: string, builtForMacStore: boolean, builtForWinStore: boolean, chromeVersion: string, electronVersion: string, envPlatform: String, envProcessorArch: String, executingInDevPath: boolean, pathToAppCfg: string, pathToAppData: string, pathToAppDir: string, pathToDocDir: string, pathToDwnDir: string, pathToResources: string, pathToTempDir: string, pathToUsrHome: string, updateFeedUrl: string, userLocale: string}}
 */
const envProps = {
  appName: app.getName(),
  appVersion: app.getVersion(),
  builtForMacStore: Boolean(process.mas),
  builtForWinStore: Boolean(process.windowsStore),
  chromeVersion: process.versions.chrome,
  electronVersion: process.versions.electron,
  envPlatform: process.platform,
  envProcessorArch: process.arch,
  executingInDevPath: Boolean(process.execPath.match(/[\\/]electron/)),
  pathToAppCfg: app.getPath('userData'),
  pathToAppData: app.getPath('appData'),
  pathToAppDir: app.getAppPath(),
  pathToDocDir: app.getPath('documents'),
  pathToDwnDir: app.getPath('downloads'),
  pathToResources: process.resourcesPath,
  pathToTempDir: app.getPath('temp'),
  pathToUsrHome: app.getPath('home'),
  updateFeedUrl: autoUpdater.getFeedURL(),
  userLocale: app.getLocale(),
};

export default envProps;
