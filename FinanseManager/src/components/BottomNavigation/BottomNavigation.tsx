import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import HomeActive from "../../../assets/HomeActive.svg";
import UserActive from "../../../assets/UserActive.svg";
import Plus from "../../../assets/Plus.svg";
import Cancel from "../../../assets/Cancel.svg";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/RootStackParamList";
import {colors} from "../../constans/colors";

interface BottomNavigationProps {
    route: string
    isButton: boolean
    buttonHandler?: () => void
    isAdd?: boolean
}

const BottomNavigation = ({route, isButton, buttonHandler, isAdd}: BottomNavigationProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();


    return (
        <View style={styles.block}>

            <TouchableOpacity onPress={() => route !== "Home" && navigation.navigate("Home")} style={styles.SvgBlock}>
                <HomeActive style={route === "Home" ? styles.sizeSVG : [styles.sizeSVG, styles.svgDisable]}/>
            </TouchableOpacity>


            {isAdd
                ? <TouchableOpacity
                onPress={buttonHandler}
                disabled={!isButton}
                style={isButton ? [styles.buttonRed] : [styles.buttonRed, {opacity: 0}]}
            >
                <Cancel style={styles.sizeSVG}/>
            </TouchableOpacity>
                : <TouchableOpacity
                onPress={buttonHandler}
                disabled={!isButton}
                style={isButton ? [styles.button] : [styles.button, {opacity: 0}]}
            >
                <Plus style={styles.sizeSVG}/>
            </TouchableOpacity>}


            <TouchableOpacity onPress={() => route !== "Profile" && navigation.navigate("Profile")} style={styles.SvgBlock}>
                <UserActive style={route == "Profile" ? styles.sizeSVG : [styles.sizeSVG, styles.svgDisable]}/>
            </TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
    block: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 100,
        backgroundColor: "#30444E",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 24,
    },
    SvgBlock: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    sizeSVG: {
        width: 20,
        height: 20,
    },
    svgDisable: {
        opacity: 0.5
    },
    button: {
        backgroundColor: colors.LIGHT_GREEN,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 46,
    },
    buttonRed: {
        backgroundColor: colors.RED,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 46,
    },
    active: {
        color: "#FFFFFF"
    }
})
export default BottomNavigation;