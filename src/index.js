import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  MedicalDisclaimer,
  TermsAndConditions,
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    MedicalDisclaimer,
    TermsAndConditions,
  },
  {
    initialRouteName: 'TermsAndConditions',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
