import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "./stylesLogout";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigation/RootStackParamList";

const Logout = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.backgroundButton}>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => signOut().then(() => navigation.navigate("GoogleSignIn"))}
      >
        <Text style={styles.loginText}>Выйти из гугл аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;