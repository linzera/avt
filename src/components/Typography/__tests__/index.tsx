import React from 'react';
import {render} from '@testing-library/react-native';
import colors from '~/theme/colors';
import Typography from '..';
import {
  fontSizeMapping,
  FontType,
  fontTypeMapping,
  TypographyComponent,
} from '../util';

describe('<Typography />', () => {
  it('should render properly given default props', () => {
    const {queryByText} = render(<Typography>Thisistext</Typography>);

    expect(queryByText('Thisistext')).not.toBeNull();
    expect(queryByText('Thisistext')).toHaveStyle({
      fontSize: 16,
      fontFamily: 'SourceSansPro-Regular',
      color: colors.black80,
    });
  });

  it.each(
    Object.keys(fontSizeMapping).map(value => ({
      variant: value as TypographyComponent,
      expected: fontSizeMapping[value as TypographyComponent],
    })),
  )('should render typography properly given component', variantCase => {
    const {getByText} = render(
      <Typography component={variantCase.variant}>Thisistext</Typography>,
    );
    expect(getByText('Thisistext')).toHaveStyle(variantCase.expected);
  });

  it.each(
    Object.keys(fontTypeMapping).map(value => ({
      variant: value as FontType,
      expected: fontTypeMapping[value as FontType],
    })),
  )('should render typography properly given component', variantCase => {
    const {getByText} = render(
      <Typography fontType={variantCase.variant}>Thisistext</Typography>,
    );
    expect(getByText('Thisistext')).toHaveStyle(variantCase.expected);
  });
});
