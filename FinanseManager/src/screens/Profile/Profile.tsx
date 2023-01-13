import { ScrollView} from "react-native";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import React, {useCallback, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import UserData from "./UserData/UserData";
import NotificationContainer from "./NotificationContainer/NotificationContainer";
import RestContainer from "./RestContainer/RestContainer";
import CategoriesLink from "./CategoriesLink/CategoriesLink";
import SynchronizationContainer from "./SynchronizationContainer/SynchronizationContainer";
import {styles} from "./stylesProfile";
import {createNotification} from "../../utils/createNotification";

const Profile = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    const config = useSelector((state: RootState) => state.config.config)
    const {isNotification,  notificationTime} = config

    useEffect(() => {
        createNotification(isNotification, notificationTime)
    } ,[isNotification, notificationTime])

    useFocusEffect(useCallback(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return () => subscriber
    }, [user]))



    function onAuthStateChanged(user: any) {
        if (initializing) setInitializing(false);
        setUser(user)
    }
    const route = useRoute()

    return (
        <>
            <ScrollView style={styles.container}>
                {user && <UserData user={user}/>}
                <NotificationContainer />
                <RestContainer />
                <CategoriesLink />
                <SynchronizationContainer />
            </ScrollView>
            <BottomNavigation
                route={route.name}
                isButton={false}
            />
        </>
    );
};

export default Profile;