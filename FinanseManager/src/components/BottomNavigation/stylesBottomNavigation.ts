import {StyleSheet} from "react-native";
import {colors} from "../../constans/colors";

export const styles = StyleSheet.create({
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