import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';

import BackButton from '../../../components/Back Button';
import Card from '../../../components/DrawCard';
import { appText } from '../../../helpers/translate';
import api from '../../../services/api';
import { AppStackParams } from '../../app.routes';
import { styles } from './styles';

type DrawProps = NativeStackScreenProps<AppStackParams, "Draw">;

type drawList = {
  playerName: string;
  typeName: string;
};

const drawText = appText.br.Draw;

const Draw: React.FC<DrawProps> = ({ navigation, route }) => {
  //app
  const [drawList, setDrawList] = useState([{ playerName: "", typeName: "" }]);

  useEffect(() => {
    async function loadTypes() {
      const response = await api.get("type");
      const arrayTypes: Array<string> = [];
      const arrayDraw: Array<drawList> = [];
      response.data.results.map((a: any) => {
        if (a.name != "unknown" && a.name != "shadow") arrayTypes.push(a.name);
      });
      route.params.map((player) => {
        var draw = Math.floor(Math.random() * arrayTypes.length);
        arrayDraw.push({
          playerName: player.name,
          typeName: arrayTypes[draw].toUpperCase(),
        });
        arrayTypes.splice(draw, 1);
      });
      setDrawList(arrayDraw);
    }
    loadTypes();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title} h4>
        {drawText.screenTitle}
      </Text>
      <ScrollView>
        {drawList.map((player, index) => {
          return <Card key={index} data={player} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Draw;
