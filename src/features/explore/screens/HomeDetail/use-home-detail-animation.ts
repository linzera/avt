import {useState} from 'react';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import colors from '~/theme/colors';

const HEADER_THRESHOLD = 80;

export function useHomeDetailAnimation() {
  const [variant, setVariantState] = useState<'transparent' | 'default'>(
    'default',
  );
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  function setVariant(offset: number) {
    setVariantState(offset > HEADER_THRESHOLD ? 'default' : 'transparent');
  }

  useDerivedValue(() => {
    runOnJS(setVariant)(scrollOffset.value);
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollOffset.value,
      [0, HEADER_THRESHOLD],
      ['rgba(255, 255, 255, 0)', colors.white100],
    );

    return {backgroundColor};
  });

  const chevronProps = useAnimatedProps(() => {
    const fillColor = interpolateColor(
      scrollOffset.value,
      [0, HEADER_THRESHOLD],
      [colors.white100, colors.primary],
    );

    return {
      fill: fillColor,
    };
  });

  const shareProps = useAnimatedProps(() => {
    const fillColor = interpolateColor(
      scrollOffset.value,
      [0, HEADER_THRESHOLD],
      [colors.white100, colors.primary],
    );

    return {
      fill: fillColor,
    };
  });

  return {
    shareProps,
    chevronProps,
    onScroll: scrollHandler,
    headerAnimatedStyle,
    variant,
  };
}
