import React from 'react';
import { mount } from 'enzyme';

import withDidMount from '../withDidMount';


describe('withDidMount', () => {
  test('should wrap component to add withDidMount method', () => {
    const Component = ({ children }) => (
      <some-component>{ children }</some-component>
    );
    const didMount = jest.fn();
    const PlugableComponent = withDidMount(didMount)(Component);
    mount(<PlugableComponent>Hello World</PlugableComponent>);
    expect(didMount.mock.calls).toEqual([[{ children: 'Hello World' }]]);
  });
});
