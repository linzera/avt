import React from 'react';
import Button from '~/components/Button';

interface Props {
  filterCount: number;
  onPress: () => void;
}

export default function ClearButton({filterCount, onPress}: Props) {
  return (
    <If condition={!!filterCount}>
      <Button variant="secondary" onPress={onPress}>
        <Button.Text color="accent">Clear all ({filterCount})</Button.Text>
      </Button>
    </If>
  );
}
