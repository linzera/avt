import React from 'react';
import {render} from '@testing-library/react-native';
import HomeInfo from '..';

describe('<HomeInfo />', () => {
  it('should render properly', () => {
    const {queryByText} = render(
      <HomeInfo
        name="Name"
        cityName="New York"
        regionName="New York"
        stateCode="NA"
      />,
    );

    expect(queryByText('New York • New York, NA')).not.toBeNull();
    expect(queryByText('Name')).not.toBeNull();
  });
});
