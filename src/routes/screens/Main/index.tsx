import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';

import Button from '../../../components/Button';
import Input from '../../../components/Input_Unform';
import Card from '../../../components/PlayerCard';
import { appText } from '../../../helpers/translate';
import api from '../../../services/api';
import { AppStackParams } from '../../app.routes';
import { styles } from './styles';

type MainProps = NativeStackScreenProps<AppStackParams, "Main">;

interface FormData {
  name: string;
}

type playerList = {
  name: string;
};

const mainText = appText.br.Main;

const Main: React.FC<MainProps> = ({ navigation }) => {
  //unform
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = (data) => {
    const arrayPlayers = Array.from(playerList);
    if (arrayPlayers.length < countTypes)
      arrayPlayers.push({
        name: data.name,
      });
    else Alert.alert(mainText.alert.addPlayer);
    setPlayerList(arrayPlayers);
  };

  //app
  const [playerList, setPlayerList] = useState<playerList[]>([]);
  const [countTypes, setCountTypes] = useState(0);

  const handleDelete = (index: number) => {
    try {
      Alert.alert(
        mainText.alert.removePlayer.title,
        mainText.alert.removePlayer.description,
        [
          {
            text: mainText.alert.removePlayer.negate,
            style: "cancel",
          },
          {
            text: mainText.alert.removePlayer.confirm,
            onPress: () => {
              const arrayPlayers = Array.from(playerList);
              arrayPlayers.splice(index, 1);
              setPlayerList(arrayPlayers);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(mainText.alert.removePlayer.error);
    }
  };

  useEffect(() => {
    async function loadTypes() {
      const response = await api.get("type");
      setCountTypes(response.data.count - 2);
    }
    loadTypes();
  });

  const drawTypes = () => {
    navigation.navigate("Draw", playerList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} h4>
        {mainText.screenTitle}
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" label={mainText.inputName}></Input>
        <Button
          title={mainText.addButton}
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
      <ScrollView>
        {playerList.map((player, index) => {
          return (
            <Card
              key={index}
              data={player}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </ScrollView>
      <Button title={mainText.drawButton} onPress={drawTypes} />
    </View>
  );
};

export default Main;
