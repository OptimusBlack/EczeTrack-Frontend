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
    'AlegreyaSansSC-Bold': require('./src/assets/fonts/AlegreyaSansSC-Bold.ttf'),
  });

  const customTextProps = {
    style: {
      // fontFamily: 'AlegreyaSansSC-Regular'
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
