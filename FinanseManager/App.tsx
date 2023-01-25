import {SafeAreaView, StatusBar, useColorScheme} from "react-native";
import React from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Navigate from "./src/navigation/Navigate";
import {Provider} from "react-redux";
import {persistor, store} from "./src/redux/store";
import {PersistGate} from "redux-persist/integration/react";


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigate/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
