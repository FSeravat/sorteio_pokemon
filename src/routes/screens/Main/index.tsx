import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import Button from '../../../components/Button';
import { appText } from '../../../helpers/translate';
import { AppStackParams } from '../../app.routes';
import { styles } from './styles';

type MainProps = NativeStackScreenProps<AppStackParams, "Main">;

const mainText = appText.br.Main;

const Main: React.FC<MainProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} h4>
        {mainText.screenTitle}
      </Text>
      <Button
        title={mainText.buttons.navigateAddPlayer}
        onPress={() => navigation.navigate("AddPlayers")}
      />
      <Button
        title={mainText.buttons.navigateDrawPlayer}
        onPress={() => navigation.navigate("DrawPlayers")}
      />
    </View>
  );
};

export default Main;
