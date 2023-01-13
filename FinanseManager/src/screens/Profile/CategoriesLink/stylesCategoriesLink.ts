import {StyleSheet} from "react-native";
import {colors} from "../../../constans/colors";

export const styles = StyleSheet.create({
    categoryBlock: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.BACKGROUND_DATA,
        padding: 15,
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
        borderTopColor: "#5c6b6f",
        borderTopWidth: 1,
    },
    categoryText: {
        color: "white",
        fontSize: 20,
        marginLeft: 20,
        fontStyle: "italic",
        flex: 1
    },
})