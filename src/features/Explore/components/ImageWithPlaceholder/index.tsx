import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '~/theme/colors';
import ImagePlaceholder from '@explore/assets/svg/img_placeholder.svg';

const styles = StyleSheet.create({
  img: {
    flex: 1,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 8,
  },
  imgPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  uri: string;
  style?: any;
  showLogo?: boolean;
}

export default function ImageWithPlaceholder({
  style,
  uri,
  showLogo = true,
}: Props) {
  const [isImagePlaceholderVisible, setImagePlaceholderVisibility] =
    useState(true);
  return (
    <>
      <FastImage
        accessibilityIgnoresInvertColors
        style={style || styles.img}
        resizeMode="cover"
        source={{
          uri: uri,
        }}
        onLoadEnd={() => setImagePlaceholderVisibility(false)}
      />
      <If condition={isImagePlaceholderVisible}>
        <View style={styles.imgPlaceholder}>
          <If condition={showLogo}>
            <ImagePlaceholder />
          </If>
        </View>
      </If>
    </>
  );
}
