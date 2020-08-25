import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { setCustomText } from 'react-native-global-props';

const Main = () => {
  let [fontsLoaded] = useFonts({
    'AlegreyaSansSC-Regular': require('./src/assets/fonts/AlegreyaSansSC-Regular.ttf'),
    'Avenir': require('./src/assets/fonts/Avenir-Medium.otf'),
    'Avenir-Bold': require('./src/assets/fonts/Avenir-Medium-Bold.otf')
  });

  const customTextProps = {
    style: {
      fontFamily: 'Avenir'
    }
  };

  setCustomText(customTextProps);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
}

export default Main;
