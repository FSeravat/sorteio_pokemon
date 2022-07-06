import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card as CardElement, CheckBox } from 'react-native-elements';

import { styles } from './styles';

type CardProps = {
  data?: Data;
  onDelete?: () => void;
  onCheck?: () => void;
};

type Data = {
  name: string;
  check: boolean;
};

export default function Card({
  data = {
    name: "",
    check: false,
  },
  onDelete,
  onCheck,
}: CardProps) {
  return (
    <View>
      <CardElement>
        <View style={styles.Card}>
          <View style={styles.Left}>
            <CheckBox size={16} onPress={onCheck} checked={data.check} />
            <Text style={styles.PlayerName}>{data.name}</Text>
          </View>
          <TouchableOpacity onPress={onDelete} style={styles.Icon}>
            <FontAwesome5 name="trash" size={20} color="#D3455B" />
          </TouchableOpacity>
        </View>
      </CardElement>
    </View>
  );
}
