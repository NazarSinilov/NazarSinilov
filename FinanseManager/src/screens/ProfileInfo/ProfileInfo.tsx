import React, {useCallback, useState} from 'react';
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../constans/colors";
import Arrow from "../../../assets/ArrowLeft.svg"
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

const ProfileInfo = ({navigation}: any) => {

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

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };
    const route = useRoute()

    return (<View style={styles.container}>

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

            <View style={styles.userBlock}>
                <Text style={styles.userTitle}>Ваше имя</Text>
                <View style={[styles.backgroundName, styles.backgroundUserInfo]}>
                    <Text style={styles.userName}>{user?.displayName}</Text>
                </View>
            </View>
            <View style={styles.userBlock}>
                <Text style={styles.userTitle}>Ваш email</Text>
                <View style={[styles.backgroundEmail, styles.backgroundUserInfo]}>
                    <Text>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.backgroundButton}>
                <TouchableOpacity
                    style={styles.ButtonLogin}
                    onPress={() => signOut().then(() => navigation.navigate("GoogleSignIn"))}
                >
                    <Text style={styles.loginText}>Выйти из гугл аккаунта</Text>
                </TouchableOpacity>
            </View>

            <BottomNavigation
                route={route.name}
                isButton={false}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    ButtonLogin: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 58,
        backgroundColor: "#40DF9F",
        borderRadius: 12,
    },
    loginText: {
        fontStyle: "italic",
        fontSize: 16,
        color: "black"
    },
    block_page_back: {
        flexDirection: "row",
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 100
    },
    text_page_back: {
        fontStyle: "italic",
        fontWeight: "400",
        fontSize: 12,
        color: "white",
        marginLeft: 6
    },
    ava_block: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 36,
        backgroundColor: colors.BACKGROUND_DATA,
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
        borderTopColor: "#5c6b6f",
        borderTopWidth: 1
    },
    profile_ava: {
        width: 124,
        height: 124,
        borderRadius: 32,
    },
    userBlock: {
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: colors.BACKGROUND_DATA,
    },

    userTitle: {
        color: "white",
        fontSize: 18,
        marginBottom: 14
    },
    backgroundUserInfo: {
        paddingHorizontal: 16,
        width: "100%",
        height: 42,
        borderRadius: 12,
        justifyContent: "center"
    },
    backgroundName: {
        backgroundColor: "#2A3C44",
    },
    backgroundEmail: {
        backgroundColor: "#475E69",
    },
    userName: {
        color: "#96A7AF",
        fontSize: 20,
    },
    backgroundButton: {
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 24,
        backgroundColor: colors.BACKGROUND_DATA
    }
})


export default ProfileInfo;


