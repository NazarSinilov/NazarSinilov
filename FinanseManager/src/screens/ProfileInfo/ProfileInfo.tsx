import React, {useCallback, useState} from 'react';
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {View} from "react-native";
import BottomNavigation from "/components/BottomNavigation/BottomNavigation";
import Avatar from "./Avatar/Avatar";
import UserInfo from "./UserInfo/UserInfo";
import Logout from "./Logout/Logout";
import {styles} from "./stylesProfileInfo";

const ProfileInfo = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  function onAuthStateChanged(user: any) {
    if (initializing) setInitializing(false);
    setUser(user)
  }

  useFocusEffect(useCallback(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber
  }, [user]))

  const route = useRoute()

  return (
    <View style={styles.container}>
      {user && <>
          <Avatar user={user}/>
          <UserInfo user={user}/>
          <Logout/>
      </>
      }
      <BottomNavigation
        route={route.name}
        isButton={false}
      />
    </View>
  );
};

export default ProfileInfo;


