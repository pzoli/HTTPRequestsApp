import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './app/screens/HomeScreen';
import ActionsScreen from './app/screens/ActionsScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import { store } from './app/data/SignalStorage';

import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Layout } from 'react-native-reanimated';
import mergeOptions from 'merge-options';

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
