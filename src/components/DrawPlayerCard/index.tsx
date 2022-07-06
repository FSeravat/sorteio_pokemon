import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Card as CardElement, CheckBox } from 'react-native-elements';

import { styles } from './styles';

type CardProps = {
  data?: Data;
  onCheck?: () => void;
  checked: boolean;
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
        </View>
      </CardElement>
    </View>
  );
}
