import {StyleSheet} from "react-native";
import {colors} from "../../../constans/colors";

export const styles = StyleSheet.create({
    profileBlock: {
        flexDirection: "row",
        backgroundColor: colors.BACKGROUND_DATA,
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
        borderTopColor: "#5c6b6f",
        borderTopWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 16,
        alignItems: "center",
        marginBottom: 26
    },
    profile_ava: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 17
    },
    userData: {
        flex: 1,
    },
    userName: {
        fontStyle: "italic",
        fontSize: 16,
        marginBottom: 4,
        color: "white"
    },
    userEmail: {
        fontSize: 14,
        color: "white"
    }
})
