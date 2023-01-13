import {StyleSheet} from "react-native";
import {colors} from "../../constans/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        paddingBottom: 100
    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    alertComplete: {
        height: 50,
        width: "70%",
        backgroundColor: "#286053",
        marginBottom: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    alertCompleteText: {
        color: colors.LIGHT_GREEN,
        fontSize: 16,
        fontStyle: "italic"
    },
    shadowText: {
        fontSize: 18,
        paddingLeft: 20
    }
})