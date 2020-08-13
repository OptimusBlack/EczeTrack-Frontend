import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2


import Dashboard  from './Dashboard'
import SecondScreen  from './SecondScreen'

const config = {
  headerMode: 'none',
};

const tabBarOptions = {
  showIcon: true,
  showLabel: false,
  style: {
    backgroundColor: 'blue',
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
  SecondScreenStack
}, {
  initialRouteName: 'DashboardStack',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  // tabBarComponent: SafeAreaMaterialTopTabBar,
});

TabNavigator.path = '';

export default TabNavigator;