import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Tabs} from './src/Navigator/Tabs';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
