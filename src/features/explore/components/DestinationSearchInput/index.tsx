import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import Button from '~/components/Button';
import colors from '~/theme/colors';

import SearchIcon from '@explore/assets/svg/search_icon.svg';
import ClearIcon from '@explore/assets/svg/clear_icon.svg';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 8,
    paddingBottom: 4,
    borderColor: colors.gray300,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.neutral,
    marginLeft: 8,
    fontSize: 16,
  },
  focusedContainer: {
    borderColor: colors.accent,
  },
});

interface Props extends TextInputProps {
  onClear: () => void;
}

export default function DestinationSearchInput({
  value,
  onFocus,
  onBlur,
  onClear,
  ...rest
}: Props) {
  const [isFocused, setFocus] = useState(false);

  function onFocusText(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (onFocus) {
      onFocus(e);
    }

    setFocus(true);
  }

  function onBlurText(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (onBlur) {
      onBlur(e);
    }

    setFocus(false);
  }

  return (
    <View
      testID="SearchInputContainer"
      style={[styles.container, isFocused && styles.focusedContainer]}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        value={value}
        onFocus={onFocusText}
        onBlur={onBlurText}
        placeholder="Search by destination name"
        placeholderTextColor="#022B5440"
        accessibilityHint="Search Destination Input"
        {...rest}
      />
      <If condition={!!value}>
        <Button
          accessibilityHint="Clear Input"
          onPress={onClear}
          variant="icon">
          <ClearIcon />
        </Button>
      </If>
    </View>
  );
}
