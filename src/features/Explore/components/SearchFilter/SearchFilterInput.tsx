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
  value: {
    flex: 1,
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
      <Choose>
        <When condition={!!value}>
          <Typography numberOfLines={1} color="neutral" style={styles.value}>
            {value}
          </Typography>
        </When>
        <Otherwise>
          <Typography style={styles.placeholder} color="primary">
            {placeholder}
          </Typography>
        </Otherwise>
      </Choose>
    </TouchableOpacity>
  );
}
