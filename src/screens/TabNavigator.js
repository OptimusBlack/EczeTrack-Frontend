import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import {theme} from '../core/theme';

import Dashboard  from './Dashboard';
import RecordScreen  from './RecordScreen';
import SecondScreen  from './SecondScreen';

import Dermatology  from './daily/Dermatology';

const config = {
  headerMode: 'none',
};

const tabBarOptions = {
  showIcon: true,
  showLabel: false,
  style: {
    backgroundColor: '#2E765E',
    zIndex: 10
  },
  tabStyle: { paddingVertical: 0  },
  indicatorStyle: { backgroundColor: 'yellow' },
  iconStyle: { height: 60 }
};


// Dashboard
const DashboardStack = createStackNavigator(
  {
    Dashboard,
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`ios-information-circle${focused ? '' : '-outline'}`} size={25} color={tintColor} />,
};

DashboardStack.path = '';

// Record Screen
const RecordScreenStack = createStackNavigator(
  {
    RecordScreen,
  },
  config
);

RecordScreenStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`recording${focused ? '' : '-outline'}`} size={25} color={tintColor} />,

};

RecordScreenStack.path = '';


// Dermatology Screen
const DermatologyScreenStack = createStackNavigator(
  {
    Dermatology,
  },
  config
);

DermatologyScreenStack.navigationOptions = {
  tabBarOptions,
  // tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`recording${focused ? '' : '-outline'}`} size={25} color={tintColor} />,

};

DermatologyScreenStack.path = '';




// Second Screen
const SecondScreenStack = createStackNavigator(
  {
    SecondScreen,
  },
  config
);

SecondScreenStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`ios-options${focused ? '' : '-outline'}`} size={25} color={tintColor} />,

};

SecondScreenStack.path = '';


function SafeAreaMaterialTopTabBar (props) {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <SafeAreaView>
        <MaterialTopTabBar {...props} />
      </SafeAreaView>
    </View>
  )
}

const TabNavigator = createMaterialTopTabNavigator({
  DashboardStack,
  RecordScreenStack,
  SecondScreenStack,
  DermatologyScreenStack
}, {
  initialRouteName: 'DermatologyScreenStack',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  // tabBarComponent: SafeAreaMaterialTopTabBar,
});

TabNavigator.path = '';

export default TabNavigator;