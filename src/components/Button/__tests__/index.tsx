/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native';
import colors from '~/theme/colors';

import Button from '../';
import {buttonStyles, ButtonVariantProp} from '../util';

const testId = 'FakeView';
const FakeView = () => <View testID={testId} />;

type VariantCases = {
  variant: ButtonVariantProp;
  expectedStyle: ViewStyle;
  expectedTextColor: string;
};

describe('<Button />', () => {
  it('should render button properly given default props', () => {
    const {queryByTestId} = render(
      <Button testID="Button">
        <FakeView />,
      </Button>,
    );

    expect(queryByTestId('Button')).not.toBeNull();
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId('Button')).toHaveStyle(buttonStyles.primary);
  });

  it('should render button properly given style prop', () => {
    const {queryByTestId} = render(
      <Button testID="Button" style={{height: 50}} />,
    );

    expect(queryByTestId('Button')).toHaveStyle({
      ...buttonStyles.primary,
      height: 50,
    });
  });

  it('should render button text properly ', () => {
    const {queryByText} = render(
      <Button>
        <Button.Text>NiceText</Button.Text>
      </Button>,
    );

    expect(queryByText('NiceText')).not.toBeNull();
  });

  it.each([
    {
      variant: 'primary',
      expectedStyle: buttonStyles.primary,
      expectedTextColor: colors.white100,
    },
    {
      variant: 'icon',
      expectedStyle: buttonStyles.icon,
      expectedTextColor: colors.white100,
    },
    {
      variant: 'secondary',
      expectedStyle: buttonStyles.secondary,
      expectedTextColor: colors.black60,
    },
    {
      variant: 'outlined',
      expectedStyle: buttonStyles.outlined,
      expectedTextColor: colors.primary,
    },
  ] as VariantCases[])(
    'should render button properly given variant',
    variantCase => {
      const {queryByTestId, getByText} = render(
        <Button testID="Button" variant={variantCase.variant}>
          <Button.Text>{variantCase.variant}</Button.Text>,
        </Button>,
      );

      expect(queryByTestId('Button')).toHaveStyle(variantCase.expectedStyle);
      expect(getByText(variantCase.variant)).toHaveStyle({
        color: variantCase.expectedTextColor,
      });
    },
  );

  it('should call onPress properly', async () => {
    const onPress = jest.fn();

    const {getByTestId} = render(
      <Button testID="Button" onPress={onPress}>
        <FakeView />,
      </Button>,
    );

    await fireEvent.press(getByTestId('Button'));

    expect(onPress).toHaveBeenCalledWith();
  });
});
