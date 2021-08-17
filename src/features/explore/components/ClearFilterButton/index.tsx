import React from 'react';
import Button from '~/components/Button';

interface Props {
  filterCount?: number;
  onPress: () => void;
}

export default function ClearButton({filterCount, onPress}: Props) {
  return (
    <Button variant="secondary" onPress={onPress}>
      <Button.Text color="accent">
        Clear all<If condition={!!filterCount}> ({filterCount})</If>{' '}
      </Button.Text>
    </Button>
  );
}
