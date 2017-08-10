import appCtx from '../../src/context/appCtx';
import { dev, prod } from '../stubs/envProps.stub';

const config = require('../../src/context/config.json');
const R = require('ramda');
const Po = require('ramda-adjunct');

describe('Application configuration values are set in a JSON file:', () => {
  it('structured as an Object.', () => {
    expect(config).not.toBeUndefined();
  });

  it('holds configurations values as integers.', () => {
    expect(Po.isInteger(config.windowDefaultHeight)).toBeTruthy();
  });

  it('holds configurations values as booleans.', () => {
    expect(Po.isBoolean(config.experimentalFeatures)).toBeTruthy();
  });
});

describe('Application Context (Test Hookup Exercise):', () => {
  it('has objects for App Details, Paths, Platform & Logger.', () => {
    const ctxKeys = R.keys(appCtx(dev, config));
    expect(
      R.equals(ctxKeys, [
        'app',
        'path',
        'platform',
        'logger',
        'isRunningOnMac',
        'isRunningOnWin',
        'isRunningOnLinux',
      ]),
    ).toBeTruthy();
    expect(R.values(appCtx(dev, config))).not.toContain(undefined);
  });

  it('has attributes for App Details in the following order.', () => {
    const ctxApp = appCtx(dev, config).app;
    const appKeys = R.keys(ctxApp) /* ? */;
    expect(
      R.equals(appKeys, [
        'name',
        'updateUrl',
        'productName',
        'version',
        'description',
        'experimentalFeatures',
        'released',
        'rollBarMain',
        'rollBarRenderer',
        'scrollBounce',
        'windowDefaultHeight',
        'windowDefaultWidth',
        'windowMainContent',
        'windowMinHeight',
        'windowMinWidth',
        'windowTitle',
      ]),
    ).toEqual(true);
    expect(R.values(ctxApp)).not.toContain(undefined);
  });

  it('has attributes for App Directory Paths.', () => {
    const ctxPath = appCtx(dev, config).path;
    const pathKeys = R.keys(ctxPath);
    expect(
      R.equals(pathKeys, [
        'appFiles',
        'configData',
        'dataFiles',
        'documents',
        'downloads',
        'home',
        'resources',
        'tempData',
      ]),
    ).toBeTruthy();
    expect(R.values(ctxPath)).not.toContain(undefined);
  });

  it('has attributes for App Platform Details.', () => {
    const ctxPlatform = appCtx(dev, config).platform;
    const platformKeys = R.keys(ctxPlatform);
    expect(
      R.equals(platformKeys, [
        'macStoreBuild',
        'winStoreBuild',
        'chromeVersion',
        'electronVersion',
        'os',
        'processor',
        'devMode',
      ]),
    ).toBeTruthy();
    expect(R.values(ctxPlatform)).not.toContain(undefined);
  });

  it('has configured logger object.', () => {
    const ctxDev = appCtx(dev, config);
    const ctxProd = appCtx(prod, config);
    const loggerDev = ctxDev.logger;
    const loggerPrd = ctxProd.logger;
    expect(loggerDev).toBeDefined();
    expect(loggerPrd).toBeDefined();
    if (ctxDev.platform.devMode) {
      expect(loggerDev.transports.file.level).toEqual('silly');
      expect(loggerDev.transports.console.level).toEqual('silly');
    } else {
      expect(loggerPrd.transports.file.level).toEqual('warn');
      expect(loggerPrd.transports.file.console).toEqual('warn');
    }
  });
});

describe('Application Context is not obscured:', () => {
  it('development context generally matches this snapshot', () => {
    expect(appCtx(dev, config)).toMatchSnapshot();
  });
  it('production context generally matches this snapshot', () => {
    expect(appCtx(prod, config)).toMatchSnapshot();
  });
});
