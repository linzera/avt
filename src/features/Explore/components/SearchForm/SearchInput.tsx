import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

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
    <TouchableOpacity onPress={onPress} style={{paddingVertical: 8}}>
      <Text>{label}</Text>
      {value ? <Text>{value}</Text> : <Text>{placeholder}</Text>}
    </TouchableOpacity>
  );
}
