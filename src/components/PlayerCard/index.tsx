import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card as CardElement } from 'react-native-elements';

import { styles } from './styles';

type CardProps = {
  data?: Data;
  onDelete?: () => void;
};

type Data = {
  name: string;
};

export default function Card({
  data = {
    name: "",
  },
  onDelete,
}: CardProps) {
  return (
    <View>
      <CardElement>
        <View style={styles.Card}>
          <Text style={styles.PlayerName}>{data.name}</Text>
          <TouchableOpacity onPress={onDelete}>
            <FontAwesome5 name="trash" size={20} color="#D3455B" />
          </TouchableOpacity>
        </View>
      </CardElement>
    </View>
  );
}
