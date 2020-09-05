import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  TabNavigator,

  ExerciseScreen,
  SleepScreen,
  StressScreen,

  SymptomScreen,
  DietScreen,
  MSUScreen,
  EnvironmentScreen,

  SymptomOTScreen,
  EnvironmentOTScreen,
  StressOTScreen,
  QualityOfLifeOTScreen
} from './';

const Router = createStackNavigator(
  {
    TabNavigator,

    ExerciseScreen,
    SleepScreen,
    StressScreen,

    SymptomScreen,
    DietScreen,
    MSUScreen,
    EnvironmentScreen,

    SymptomOTScreen,
    EnvironmentOTScreen,
    StressOTScreen,
    QualityOfLifeOTScreen
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
