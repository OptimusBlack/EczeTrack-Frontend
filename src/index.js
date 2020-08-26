import { createAppContainer } from 'react-navigation';
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
  DietScreen
} from './screens';

const Router = createStackNavigator(
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
    DietScreen
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
