import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Card as CardElement } from 'react-native-elements';

import { typeImage } from '../../helpers/imagesPath';
import { styles } from './styles';

type CardProps = {
  data?: Data;
  onDelete?: () => void;
  onEdit?: () => void;
};

type Data = {
  playerName: string;
  typeName: string;
};

export default function Card({
  data = {
    playerName: "",
    typeName: "",
  },
  onDelete,
}: CardProps) {
  const image = "../../images/" + data.typeName + ".png";
  return (
    <View>
      <CardElement>
        <View style={styles.Card}>
          <Text style={styles.PlayerName}>{data.playerName}</Text>
          <View style={styles.TypeContainer}>
            <Image source={typeImage[data.typeName]} style={styles.TypeIcon} />
            <Text style={styles.typeName}>{data.typeName}</Text>
          </View>
        </View>
      </CardElement>
    </View>
  );
}
