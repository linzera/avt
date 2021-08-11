import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  placeholder: {
    opacity: 0.3,
  },
});

interface Props {
  label: string;
  value?: string;
  placeholder: string;
  onPress: () => void;
}

export default function SearchInput({
  label,
  placeholder,
  value,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Typography fontType="medium" color="accent" style={styles.label}>
        {label}
      </Typography>
      {value ? (
        <Typography color="neutral">{value}</Typography>
      ) : (
        <Typography style={styles.placeholder} color="primary">
          {placeholder}
        </Typography>
      )}
    </TouchableOpacity>
  );
}
