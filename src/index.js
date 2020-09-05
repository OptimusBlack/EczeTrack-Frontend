import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStack from './screens/auth';
import PrivateStack from './screens/PrivateScreenNavigator';


const Router = createSwitchNavigator(
  {
    AuthStack,
    PrivateStack
  },
  {
    initialRouteName: 'AuthStack',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
