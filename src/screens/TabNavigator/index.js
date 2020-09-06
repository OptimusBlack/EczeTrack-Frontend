import React from 'react';
import { Platform, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {theme} from '../../core/theme';

import Dashboard  from './Dashboard';
import DailyScreen  from './DailyScreen';
import WeeklyScreen  from './WeeklyScreen';
import OneTimeScreen  from './OneTimeScreen';
import SettingScreen  from './SettingScreen';
import { Translation } from 'react-i18next';

const config = {
  headerMode: 'none',
};

const tabBarOptions = {
  showIcon: true,
  showLabel: true,
  style: {
    backgroundColor: 'transparent',
    zIndex: 10
  },
  tabStyle: { paddingVertical: 5  },
  indicatorStyle: { backgroundColor: 'white' },
  labelStyle: { fontSize: 10 }
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 11
  }
});

// Dashboard
const DashboardStack = createStackNavigator(
  {
    Dashboard,
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-analytics" size={25} color={tintColor} />,
  tabBarLabel: <Translation>{(t) => <Text style={styles.text} >{t('Dashboard')}</Text>}</Translation>
};

DashboardStack.path = '';

// Daily Screen
const DailyScreenStack = createStackNavigator(
  {
    DailyScreen,
  },
  config
);

DailyScreenStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <MaterialIcons name="today" size={25} color={tintColor} />,
  tabBarLabel: <Translation>{(t) => <Text style={styles.text} >{t('Daily')}</Text>}</Translation>
};

DailyScreenStack.path = '';


// Weekly Screen
const WeeklyScreenStack = createStackNavigator(
  {
    WeeklyScreen,
  },
  config
);

WeeklyScreenStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <MaterialCommunityIcons name="calendar-week" size={25} color={tintColor} />,
  tabBarLabel: <Translation>{(t) => <Text style={styles.text} >{t('Weekly')}</Text>}</Translation>
};

WeeklyScreenStack.path = '';



// OneTime Screen
const OneTimeStack = createStackNavigator(
  {
    OneTimeScreen,
  },
  config
);

OneTimeStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <MaterialIcons name="today" size={25} color={tintColor} />,
  tabBarLabel: <Translation>{(t) => <Text style={styles.text} >{t('Bootcamp')}</Text>}</Translation>
};

OneTimeStack.path = '';




// Setting Screen
const SettingScreenStack = createStackNavigator(
  {
    SettingScreen,
  },
  config
);

SettingScreenStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`ios-options`} size={25} color={tintColor} />,
  tabBarLabel: <Translation>{(t) => <Text style={styles.text} >{t('Settings')}</Text>}</Translation>
};

SettingScreenStack.path = '';


function SafeAreaMaterialTopTabBar (props) {
  return (
    <View style={{backgroundColor: '#2E765E'}}>
      <SafeAreaView>
        <MaterialTopTabBar {...props} />
      </SafeAreaView>
    </View>
  )
}

const TabNavigator = createMaterialTopTabNavigator({
  DashboardStack,
  DailyScreenStack,
  WeeklyScreenStack,
  OneTimeStack,
  SettingScreenStack,
}, {
  initialRouteName: 'DashboardStack',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarComponent: SafeAreaMaterialTopTabBar,
});

TabNavigator.path = '';

export default TabNavigator;