import React from 'react';
import {render} from '@testing-library/react-native';
import AnimatedSvgIcon, {chevronD, shareD} from '..';

describe('<AnimatedSvgIcon />', () => {
  it('should render chevron as expected', () => {
    const {toJSON} = render(<AnimatedSvgIcon d={chevronD} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render share as expected', () => {
    const {toJSON} = render(<AnimatedSvgIcon d={shareD} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
