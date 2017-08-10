import RollBar from 'rollbar';

/**
 * Returns a report object that can used to send event messages to RollBar.
 * The reporter used rollBar init, so subsequent calls does not require configuration
 * import rollBar and call log will cause the correct messages to show up in rollBar.
 * @param {Object} ctx - Application Context
 * @returns {Object} RollBar Object
 */
const enableReporter = ctx => {
  const reporter = RollBar.init({
    accessToken: ctx.app.rollBarMain,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  reporter.configure({
    payload: {
      appVersion: ctx.app.version,
      platform: process.platform,
    },
  });
  return reporter;
};

export default enableReporter;
