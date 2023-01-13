import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#23333a",
    },
    loader: {
        transform: [{scaleX: 4}, {scaleY: 4}],
        marginBottom: 40
    },
    loaderText: {
        color: "#FFFFFF",
        fontSize: 20
    },
})