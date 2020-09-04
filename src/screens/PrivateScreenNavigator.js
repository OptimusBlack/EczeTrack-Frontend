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
  QualityOfLife
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
    QualityOfLife
  },
  {
    initialRouteName: 'QualityOfLife',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
