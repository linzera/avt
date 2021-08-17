/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {render} from '@testing-library/react-native';
import Divider from '..';

describe('<Divider />', () => {
  it('should render properly given default props', () => {
    const {toJSON} = render(<Divider />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render properly given horizontal prop', () => {
    const {toJSON} = render(<Divider horizontal />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render properly given style prop', () => {
    const {container} = render(<Divider style={{height: 50}} />);
    expect(container).toHaveStyle({height: 50});
  });
});
