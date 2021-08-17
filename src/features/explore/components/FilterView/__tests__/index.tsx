import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import FilterView from '..';

describe('<FilterView />', () => {
  it('should render properly', () => {
    const {queryByText} = render(
      <FilterView onSubmit={() => undefined}>
        <Text>ThisText</Text>
      </FilterView>,
    );

    expect(queryByText('ThisText')).not.toBeNull();
    expect(queryByText('Search')).not.toBeNull();
  });

  it('should call onSubmit properly', async () => {
    const onSubmit = jest.fn();
    const {getByText} = render(
      <FilterView onSubmit={onSubmit}>
        <Text>ThisText</Text>
      </FilterView>,
    );

    await fireEvent.press(getByText('Search'));

    expect(onSubmit).toHaveBeenCalledWith();
  });
});
