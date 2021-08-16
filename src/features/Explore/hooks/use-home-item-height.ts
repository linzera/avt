import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function useHomeItemHeight() {
  const data = useSafeAreaInsets();
  const dimensions = useWindowDimensions();

  return useMemo(
    () => (dimensions.height - data.bottom) * 0.84,
    [dimensions, data],
  );
}
