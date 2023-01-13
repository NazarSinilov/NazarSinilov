import {StyleSheet} from "react-native";
import {colors} from "../../../constans/colors";

export const styles = StyleSheet.create({
    backgroundButton: {
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 24,
        backgroundColor: colors.BACKGROUND_DATA
    },
    buttonLogin: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 58,
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 12,
    },
    loginText: {
        fontStyle: "italic",
        fontSize: 16,
        color: "black"
    },
})