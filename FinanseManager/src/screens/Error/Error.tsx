import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {colors} from "../../constans/colors";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootStackParamList";

type ErrorProps = NativeStackScreenProps<RootStackParamList, "Error">

const Error = ({route} : ErrorProps) => {
        const {errorMessage} = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.textError}>
                {errorMessage}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        justifyContent: "center",
        alignItems: "center"
    },
    textError: {
        fontWeight: "700",
        color: "white",
        fontSize: 34
    }
})
export default Error;