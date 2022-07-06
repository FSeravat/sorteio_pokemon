import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Text } from 'react-native-elements';

import BackButton from '../../../components/Back Button';
import Button from '../../../components/Button';
import Card from '../../../components/DrawPlayerCard';
import PlayerCard from '../../../components/PlayerCard';
import { appText } from '../../../helpers/translate';
import storage from '../../../services/storage';
import { AppStackParams } from '../../app.routes';
import { styles } from './styles';

type DrawPlayersProps = NativeStackScreenProps<AppStackParams, "DrawPlayers">;

const drawPlayersText = appText.br.DrawPlayers;

type player = {
  name: string;
  check: boolean;
};

type selectedPlayer = {
  name: string;
};

const DrawPlayers: React.FC<DrawPlayersProps> = ({ navigation }) => {
  const [playerView, setPlayerView] = useState(false);
  const [playerList, setPlayerList] = useState<player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<selectedPlayer[]>([]);

  useEffect(() => {
    async function loadPlayers() {
      storage.load({ key: "players" }).then((ret) => {
        const arrayPlayers: player[] = [];
        ret.map((player: any) => {
          var checked = false;
          if (selectedPlayers.find((e) => e.name === player.name) != undefined)
            checked = true;
          arrayPlayers.push({ name: player.name, check: checked });
        });
        setPlayerList(arrayPlayers);
      });
    }
    loadPlayers();
  }, []);

  const onCheckPress = (index: number) => {
    const arrayPlayers = Array.from(playerList);
    arrayPlayers[index].check = !arrayPlayers[index].check;
    setPlayerList(arrayPlayers);
    const selectPlayersArray: player[] = [];
    arrayPlayers.map((player) => {
      if (player.check) selectPlayersArray.push(player);
    });
    setSelectedPlayers(selectPlayersArray);
  };

  const selectPlayers = () => {
    storage.save({ key: "lastDraw", data: selectedPlayers });
    setPlayerView(false);
  };

  const drawTypes = () => {
    navigation.navigate("Draw", selectedPlayers);
  };

  const handleDelete = (index: number) => {
    try {
      Alert.alert(
        drawPlayersText.alert.removePlayer.title,
        drawPlayersText.alert.removePlayer.description,
        [
          {
            text: drawPlayersText.alert.removePlayer.negate,
            style: "cancel",
          },
          {
            text: drawPlayersText.alert.removePlayer.confirm,
            onPress: () => {
              const selectedArrayPlayers = Array.from(selectedPlayers);
              var elementIndex = playerList.findIndex(
                (e) => e === selectedPlayers[index]
              );
              selectedArrayPlayers.splice(index, 1);
              setSelectedPlayers(selectedArrayPlayers);
              const arrayPlayers = Array.from(playerList);
              arrayPlayers[elementIndex].check = false;
              setPlayerList(arrayPlayers);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(drawPlayersText.alert.removePlayer.error);
    }
  };

  const overlayPlayers = () => {
    return (
      <Overlay isVisible={playerView} overlayStyle={styles.overlay}>
        <View style={styles.overlayContainer}>
          <ScrollView style={styles.playerList}>
            {playerList.map((player, index) => {
              return (
                <Card
                  key={index}
                  data={player}
                  checked={player.check}
                  onCheck={() => onCheckPress(index)}
                />
              );
            })}
          </ScrollView>
          <Button
            title={drawPlayersText.buttons.addPlayer}
            onPress={selectPlayers}
          />
        </View>
      </Overlay>
    );
  };
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title} h4>
        {drawPlayersText.screenTitle}
      </Text>
      <Button
        title={drawPlayersText.buttons.addPlayer}
        onPress={() => setPlayerView(true)}
      />
      <ScrollView>
        {selectedPlayers.map((player, index) => {
          return (
            <PlayerCard
              key={index}
              data={player}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </ScrollView>
      <Button title={drawPlayersText.buttons.draw} onPress={drawTypes} />
      {overlayPlayers()}
    </View>
  );
};

export default DrawPlayers;
