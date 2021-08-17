import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import colors from '~/theme/colors';
import DestinationSearchInput from '..';

describe('<DestinationSearchInput />', () => {
  it('should render as expected given default props', () => {
    const {toJSON, queryByHintText} = render(
      <DestinationSearchInput onClear={() => undefined} />,
    );

    expect(queryByHintText('Clear Button')).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should behave as expected on focus and blur', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const {getByHintText, getByTestId} = render(
      <DestinationSearchInput
        onClear={() => undefined}
        onBlur={onBlur}
        onFocus={onFocus}
      />,
    );

    const inputHintText = 'Search Destination Input';

    await fireEvent(getByHintText(inputHintText), 'focus');

    expect(onFocus).toHaveBeenCalled();
    expect(getByTestId('SearchInputContainer')).toHaveStyle({
      borderColor: colors.accent,
    });

    await fireEvent(getByHintText(inputHintText), 'blur');

    expect(onBlur).toHaveBeenCalled();
    expect(getByTestId('SearchInputContainer')).toHaveStyle({
      borderColor: colors.gray300,
    });
  });

  it('should render clear button given valid value', async () => {
    const onClear = jest.fn();

    const {queryByHintText, getByHintText} = render(
      <DestinationSearchInput onClear={onClear} value="Value" />,
    );

    expect(queryByHintText('Clear Input')).not.toBeNull();

    await fireEvent.press(getByHintText('Clear Input'));

    expect(onClear).toHaveBeenCalledWith();
  });
});
