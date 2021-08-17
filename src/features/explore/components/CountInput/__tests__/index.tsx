import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CountInput from '..';

function WrapperComponent(props: {maxCount?: number}) {
  const [value, setValue] = useState(0);

  return <CountInput value={value} onCountPress={setValue} {...props} />;
}

describe('<CountInput />', () => {
  it('should render as expected given default props', () => {
    const {queryByText} = render(
      <CountInput value={0} onCountPress={() => undefined} />,
    );
    expect(queryByText(/0/)).not.toBeNull();
  });

  it('should render behave and render updated value as expected', async () => {
    const {getByHintText, queryByText} = render(<WrapperComponent />);

    expect(queryByText('0')).not.toBeNull();
    await fireEvent.press(getByHintText('Increment'));

    expect(queryByText('1')).not.toBeNull();
    await fireEvent.press(getByHintText('Decrement'));

    expect(queryByText('0')).not.toBeNull();
  });

  it('should not increment if value is same as maxCount', async () => {
    const {getByHintText, queryByText} = render(
      <WrapperComponent maxCount={1} />,
    );

    expect(queryByText('0')).not.toBeNull();
    await fireEvent.press(getByHintText('Increment'));

    expect(queryByText('1')).not.toBeNull();
    await fireEvent.press(getByHintText('Increment'));

    expect(queryByText('1')).not.toBeNull();
  });
});
