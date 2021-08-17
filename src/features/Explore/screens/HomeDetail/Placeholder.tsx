import React from 'react';
import {StyleSheet} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';

const styles = StyleSheet.create({
  spacing: {
    marginTop: 16,
  },
});

export default function DetailsPlaceholder() {
  return (
    <>
      <Placeholder Animation={Fade}>
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine width={24} />
      </Placeholder>
      <Placeholder style={styles.spacing} Animation={Fade}>
        <PlaceholderLine height={28} width={40} />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
      </Placeholder>
    </>
  );
}
