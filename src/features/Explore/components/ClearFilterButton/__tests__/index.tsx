import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ClearButton from '..';

describe('<ClearFilterButton />', () => {
  it('should render as expected given default props', () => {
    const {queryByText} = render(<ClearButton onPress={() => undefined} />);
    expect(queryByText(/Clear all/)).not.toBeNull();
  });

  it('should render as expected given filterCount prop', () => {
    const {queryByText} = render(
      <ClearButton filterCount={1} onPress={() => undefined} />,
    );
    expect(queryByText(/(1)/)).not.toBeNull();
  });

  it('should call onPress properly', async () => {
    const onPress = jest.fn();
    const {getByText} = render(<ClearButton onPress={onPress} />);

    await fireEvent.press(getByText(/Clear all/));

    expect(onPress).toHaveBeenCalledWith();
  });
});
