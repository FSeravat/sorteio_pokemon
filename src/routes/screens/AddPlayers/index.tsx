import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';

import BackButton from '../../../components/Back Button';
import Button from '../../../components/Button';
import Input from '../../../components/Input_Unform';
import Card from '../../../components/PlayerCard';
import { appText } from '../../../helpers/translate';
import storage from '../../../services/storage';
import { AppStackParams } from '../../app.routes';
import { styles } from './styles';

type AddPlayersProps = NativeStackScreenProps<AppStackParams, "AddPlayers">;

interface FormData {
  name: string;
}

type playerList = {
  name: string;
};

const addPlayerText = appText.br.AddPlayer;

const AddPlayers: React.FC<AddPlayersProps> = () => {
  //unform
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = (data) => {
    const arrayPlayers = Array.from(playerList);
    if (arrayPlayers.find((e) => e.name === data.name) != undefined) {
      Alert.alert(addPlayerText.alert.addPlayer.sameName);
    } else {
      if (data.name == "")
        Alert.alert(addPlayerText.alert.addPlayer.emptyField);
      else
        arrayPlayers.push({
          name: data.name,
        });
    }
    setPlayerList(arrayPlayers);
    storage.save({ key: "players", data: arrayPlayers });
    formRef.current?.clearField("name");
  };

  //app
  const [playerList, setPlayerList] = useState<playerList[]>([]);

  const handleDelete = (index: number) => {
    try {
      Alert.alert(
        addPlayerText.alert.removePlayer.title,
        addPlayerText.alert.removePlayer.description,
        [
          {
            text: addPlayerText.alert.removePlayer.negate,
            style: "cancel",
          },
          {
            text: addPlayerText.alert.removePlayer.confirm,
            onPress: () => {
              const arrayPlayers = Array.from(playerList);
              arrayPlayers.splice(index, 1);
              setPlayerList(arrayPlayers);
              storage.save({ key: "players", data: arrayPlayers });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(addPlayerText.alert.removePlayer.error);
    }
  };

  useEffect(() => {
    async function loadPlayers() {
      storage.load({ key: "players" }).then((ret) => {
        setPlayerList(ret);
      });
    }
    loadPlayers();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title} h4>
        {addPlayerText.screenTitle}
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" label={addPlayerText.inputName}></Input>
        <Button
          title={addPlayerText.addButton}
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
    </View>
  );
};

export default AddPlayers;
