/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../src/gui/app';

describe('Output HTML for the application.', () => {
  test('Welcome message snapshot.', () => {
    const component = renderer.create(<App />);
    const htmlTree = component.toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
});
