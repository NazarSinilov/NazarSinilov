import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    alertContainer : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    alertWindow : {
        width: "80%",
        height: 150,
        backgroundColor: "#623a42",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    topPart : {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    titleText : {
        fontSize: 20,
        color: "white",
        fontStyle: "italic"
    },
    errorText : {
        color: "white",
        marginBottom: 20
    }
})