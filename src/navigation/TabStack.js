import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BookmarkView, HomeView, SettingsView } from '../views';
import TabBar from '../components/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={() => {
          return { headerShown: false };
        }}
      />
    </Stack.Navigator>
  );
}

export const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ keyboardHidesTabBar: true }}
        initialRouteName="Home"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="Bookmark" component={BookmarkView} />
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
