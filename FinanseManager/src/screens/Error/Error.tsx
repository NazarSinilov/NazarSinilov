import React from 'react';
import {Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootStackParamList";
import {styles} from "./stylesError";

type ErrorProps = NativeStackScreenProps<RootStackParamList, "Error">

const Error = ({route}: ErrorProps) => {
  const {errorMessage} = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.textError}>
        {errorMessage}
      </Text>
    </View>
  );
};

export default Error;