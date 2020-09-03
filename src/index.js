import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  MedicalDisclaimer,
  TermsAndConditions,
  PersonalInformationCollectionStatement,
  ResetPassword,
  TabNavigator,

  ExerciseScreen,
  SleepScreen,
  StressScreen,

  SymptomScreen,
  DietScreen,
  MSUScreen,
  EnvironmentScreen,

  SymptomF2Screen
} from './screens';

const Router = createSwitchNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    TabNavigator,
    MedicalDisclaimer,
    TermsAndConditions,
    PersonalInformationCollectionStatement,
    ResetPassword,

    ExerciseScreen,
    SleepScreen,
    StressScreen,

    SymptomScreen,
    DietScreen,
    MSUScreen,
    EnvironmentScreen,

    SymptomF2Screen
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
