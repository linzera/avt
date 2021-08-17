import React from 'react';
import {render} from '@testing-library/react-native';
import HomeCharacteristics, {CHARACTERISTICS_MAPPING} from '..';

describe('<HomeCharacteristics />', () => {
  it('should render properly', () => {
    const {toJSON} = render(<HomeCharacteristics />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render all characteristics properly', () => {
    const {toJSON} = render(
      <HomeCharacteristics>
        {Object.keys(CHARACTERISTICS_MAPPING).map(item => (
          <HomeCharacteristics.Item
            key={item}
            item={item as keyof typeof CHARACTERISTICS_MAPPING}
            count={1}
            showLabel
          />
        ))}
      </HomeCharacteristics>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  describe('<HomeCharacteristics.Item />', () => {
    it('should render properly', () => {
      const {queryByText} = render(
        <HomeCharacteristics.Item item="rooms" count={1} showLabel />,
      );

      expect(queryByText(/1/)).not.toBeNull();
      expect(queryByText(/Bedrooms/)).not.toBeNull();
    });

    it('should not render count if has not count or it is 0', () => {
      const {queryByText} = render(
        <HomeCharacteristics.Item item="rooms" count={0} showLabel />,
      );

      expect(queryByText(/0/)).toBeNull();
      expect(queryByText(/Bedrooms/)).not.toBeNull();
    });

    it('should not render label given false showLabel prop', () => {
      const {queryByText} = render(
        <HomeCharacteristics.Item item="rooms" count={1} showLabel={false} />,
      );

      expect(queryByText(/1/)).not.toBeNull();
      expect(queryByText(/Bedrooms/)).toBeNull();
    });
  });
});
