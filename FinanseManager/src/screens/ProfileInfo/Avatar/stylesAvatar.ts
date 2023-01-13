import {StyleSheet} from "react-native";
import {colors} from "../../../constans/colors";


export const styles = StyleSheet.create({
    ava_block: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 36,
        backgroundColor: colors.BACKGROUND_DATA,
        borderBottomColor: colors.GRAY,
        borderBottomWidth: 1,
        borderTopColor: colors.GRAY,
        borderTopWidth: 1
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
    profile_ava: {
        width: 124,
        height: 124,
        borderRadius: 32,
    }
})