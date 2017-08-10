const assert = require('assert-plus');
const log = require('electron-log');
const R = require('ramda');

const appDetailsReMap = {
  sourceKeys: ['appName', 'updateFeedUrl'],
  destinationKeys: ['name', 'updateUrl', 'jsonStoreRootKey'],
};

const pathMap = {
  sourceKeys: [
    'pathToAppCfg',
    'pathToAppData',
    'pathToAppDir',
    'pathToDocDir',
    'pathToDwnDir',
    'pathToResources',
    'pathToTempDir',
    'pathToUsrHome',
  ],
  destinationKeys: [
    'appFiles',
    'configData',
    'dataFiles',
    'documents',
    'downloads',
    'home',
    'resources',
    'tempData',
  ],
};

const platformMap = {
  sourceKeys: [
    'builtForMacStore',
    'builtForWinStore',
    'chromeVersion',
    'electronVersion',
    'envPlatform',
    'envProcessorArch',
    'executingInDevPath',
  ],
  destinationKeys: [
    'macStoreBuild',
    'winStoreBuild',
    'chromeVersion',
    'electronVersion',
    'os',
    'processor',
    'devMode',
  ],
};

const extractValues = (propertyMap, envSource) =>
  R.zipObj(
    propertyMap.destinationKeys,
    R.props(propertyMap.sourceKeys, envSource),
  );

const prodLogger = () => {
  process.NODE_NDEBUG = false;
  log.transports.file.appName = `${appDetailsReMap.appName}_log`;
  log.transports.file.maxSize = 5 * 1024 * 1024;
  return log;
};

const devLogger = () => {
  process.NODE_NDEBUG = true;
  log.transports.file.file = `logs/${new Date().getTime()}.txt`;
  log.transports.file.level = 'silly';
  log.transports.console.level = 'silly';
  return log;
};

/**
 * Returns a cached Application Context.
 *
 * The context holds the details about the current runtime environment and App configuration.
 * It is cached/memorized after it is created for the first time.
 *
 * @param {object} env - runtime environmental variables.
 * @param {object} config - application configuration.
 * @return {Object} containing the application context.
 */
const appCtx = R.memoize((env, config) => {
  assert.object(config, 'package');
  assert.object(env, 'environment');
  assert(!R.contains(undefined, R.values(env)), 'Not all env props defined.');
  return {
    app: R.merge(extractValues(appDetailsReMap, env), config),
    path: extractValues(pathMap, env),
    platform: extractValues(platformMap, env),
    logger: env.executingInDevPath ? devLogger() : prodLogger(),
    isRunningOnMac: env.envPlatform === 'darwin',
    isRunningOnWin: env.envPlatform === 'win32',
    isRunningOnLinux: env.envPlatform === 'linux',
  };
});

export default appCtx;
