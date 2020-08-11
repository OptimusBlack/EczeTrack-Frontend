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
  PersonalInformationCollectionStatement
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
    PersonalInformationCollectionStatement
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
