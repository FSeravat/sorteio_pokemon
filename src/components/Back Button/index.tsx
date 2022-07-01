import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default function BackButton() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons
        name="arrow-back"
        size={30}
        color="black"
        style={styles.container}
      />
    </TouchableOpacity>
  );
}
