import {Image, Pressable, Text, View} from "react-native";
import Arrow from "/assets/ArrowLeft.svg";
import React from "react";
import {styles} from "./stylesAvatar";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "/navigation/RootStackParamList";

interface AvatarProps {
  user: FirebaseAuthTypes.User
}

const Avatar = ({user}: AvatarProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

  return (
    <View style={styles.ava_block}>
      <Pressable
        style={styles.block_page_back}
        onPress={() => navigation.navigate("Profile")}
      >
        <Arrow
          width={20}
          height={20}
        />
        <Text style={styles.text_page_back}>Назад</Text>
      </Pressable>
      <Image style={styles.profile_ava}
             source={user
               ? {uri: user?.photoURL}
               : require("../../../assets/default_ava.jpg")}
      />
    </View>
  );
};

export default Avatar;
