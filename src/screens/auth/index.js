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
} from '../';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    MedicalDisclaimer,
    TermsAndConditions,
    PersonalInformationCollectionStatement,
    ResetPassword,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
