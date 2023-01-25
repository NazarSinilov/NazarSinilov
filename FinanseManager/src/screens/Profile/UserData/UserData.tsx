import {Image, Text, TouchableOpacity, View} from "react-native";
import ArrowRight from "/assets/ArrowRight.svg";
import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "/navigation/RootStackParamList";
import {styles} from "./stylesUserData";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";

interface UserDataProps {
  user: FirebaseAuthTypes.User
}

const UserData = ({user}: UserDataProps) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProfileInfo")} style={styles.profileBlock}>
      <Image style={styles.profile_ava}
             source={user
               ? {uri: user?.photoURL}
               : require("../../../assets/default_ava.jpg")}
      />
      <View style={styles.userData}>
        <Text style={styles.userName}>{user?.displayName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
      <ArrowRight/>
    </TouchableOpacity>
  );
};

export default UserData;