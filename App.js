import React, { useEffect, useState } from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { setCustomText } from 'react-native-global-props';

import { init } from './src/translation';

import Notifications from './src/NotificationManager'

const Main = () => {
  const [translationLoaded, setTranslationLoaded] = useState(true);
  let [fontsLoaded] = useFonts({
    'AlegreyaSansSC-Regular': require('./src/assets/fonts/AlegreyaSansSC-Regular.ttf'),
    'Avenir': require('./src/assets/fonts/Avenir-Medium.otf'),
    'Avenir-Bold': require('./src/assets/fonts/Avenir-Medium-Bold.otf')
  });

  useEffect(() => {
    const translationInit = async() => {
      await init();
      setTranslationLoaded(false);
    }
    translationInit();
  });

  const customTextProps = {
    style: {
      fontFamily: 'Avenir'
    }
  };

  setCustomText(customTextProps);

  if (!fontsLoaded || translationLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider theme={theme}>
      <App />
      <Notifications/>
    </Provider>
  );
}

export default Main;
