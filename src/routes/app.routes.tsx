import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddPlayers from './screens/AddPlayers';
import Draw from './screens/Draw';
import DrawPlayers from './screens/DrawPlayers';
import Main from './screens/Main';

export type AppStackParams = {
  Main: undefined;
  Draw: playerList[];
  AddPlayers: undefined;
  DrawPlayers: undefined;
};

type playerList = {
  name: string;
};

const App = createNativeStackNavigator<AppStackParams>();

export default function Routes() {
  return (
    <App.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="Main" component={Main} />
      <App.Screen name="Draw" component={Draw} />
      <App.Screen name="AddPlayers" component={AddPlayers} />
      <App.Screen name="DrawPlayers" component={DrawPlayers} />
    </App.Navigator>
  );
}
