import React, { useState } from 'react'
import { LogBox, StatusBar, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import { COLOR } from './src/constants'
import * as Font from "expo-font";
import { store, persistor } from './src/redux/Store'
import { LinearGradient } from 'expo-linear-gradient'
import { extendTheme, NativeBaseProvider } from "native-base"
import AppLoading from "expo-app-loading";

LogBox.ignoreLogs([
  `Unexpected HTTP code Response`,
  `Can't perform a React`,
  `source.uri should`,
  `Node of type`,
  `Image URL`,
  `Please pass alt`,
  `VirtualizedLists should`,
  `The contrast ratio of`,
  `Online fetched source`
])


const config = {
  dependencies: { 'linear-gradient': LinearGradient }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const _loadResourcesAsync = async () => {
    return await Promise.all([
      Font.loadAsync({
        Metropolis: require("./src/assets/font/Metropolis/Metropolis-Medium.otf"),
        // Poppin: require("./src/assets/font/Poppins/Poppins-Regular.ttf"),
      }),
    ]);
  };
  const _handleLoadingError = (error) => {
    console.warn(error);
  };
  const _handleFinishLoading = () => {
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    const theme = extendTheme({
      components: {
        Select: {
          baseStyle: { color: COLOR.white },
          defaultProps: {},
          variants: {},
          sizes: {},
        },
        Text: {
          baseStyle: {
            // fontFamily : "Poppin",
            fontFamily: "Metropolis",
          },
          defaultProps: {
          },
          variants: {},
          sizes: {},
        }
      }
    })
    return (
      <NativeBaseProvider config={config} theme={theme}>
        <NavigationContainer>
          <Provider store={store}>
            <StatusBar barStyle="default" />
            <Navigation />
          </Provider>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}

export default App