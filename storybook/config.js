/* eslint-disable global-require */
import { configure } from '@storybook/react';

function loadStories() {
  require('./button');
}

configure(loadStories, module);
