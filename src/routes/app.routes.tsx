import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Draw from './screens/Draw';
import Main from './screens/Main';

export type AppStackParams = { Main: undefined; Draw: playerList[] };

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
    </App.Navigator>
  );
}
