import React from 'react';
import {render} from '@testing-library/react-native';
import EmptyState from '../EmptyState';

describe('<EmptyState />', () => {
  it('should render properly', () => {
    const {toJSON} = render(<EmptyState />);
    expect(toJSON()).toMatchSnapshot();
  });
});
