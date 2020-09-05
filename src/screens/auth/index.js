import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  MedicalDisclaimer,
  MedicalDisclaimerZH,
  TermsAndConditions,
  TermsAndConditionsZH,
  PersonalInformationCollectionStatement,
  PersonalInformationCollectionStatementZH,
  ResetPassword,
} from '../';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    MedicalDisclaimer,
    MedicalDisclaimerZH,
    TermsAndConditions,
    TermsAndConditionsZH,
    PersonalInformationCollectionStatement,
    PersonalInformationCollectionStatementZH,
    ResetPassword,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
