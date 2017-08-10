const shortcut = require('electron-localshortcut');

/**
 * Attaches shortcut keys to the passed in window so they are globally available.
 * @param window
 */
const registerShortcutKeys = window => {
  shortcut.register(window, 'Ctrl+S', () => {
    console.log('Control S');
  });
  shortcut.register(window, 'Ctrl+D', () => {
    console.log('Control D');
  });
};

export default registerShortcutKeys;
