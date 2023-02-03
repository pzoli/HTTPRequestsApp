import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import ActionsScreen from './screens/ActionsScreen';
import DetailsScreen from './screens/DetailsScreen';
import { store } from './data/SignalStorage';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, View } from 'react-native';


const Drawer = createDrawerNavigator();

const homeScreenListeners = ({ navigation, route }) => ({
  focus: async (e) => {
    //console.log('HomeScreen focused.');
    await store.init();
    navigation.setParams({
      signals: store.getSignalsArray(),
    });
  }
})

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="HomeScreen" component={HomeScreen}
          initialParams={{ signals: [] }}
          listeners={homeScreenListeners}
          options={{ drawerLabel: "Signals", title: "Signals" }}
        />
        <Drawer.Screen name="Details" component={DetailsScreen}
          initialParams={{
            title: '',
            uri: '',
            saveItem: false
          }}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen name="Actions" component={ActionsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
