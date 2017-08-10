const spawn = require('cross-spawn');
const path = require('path');

const sep = `\\${path.sep}`;
const pattern = `test${sep}unit${sep}.+\\.test\\.js`;

spawn.sync(path.normalize('./node_modules/.bin/jest'), [pattern], {
  stdio: 'inherit',
});
