import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalWindow : {
        width: "70%",
        height: 150,
        backgroundColor: "#2b5164",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    modalText: {
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
    },
    buttonBlock: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    },

    modalButton: {
        width: "30%",
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        fontSize: 18,
        color: "white"
    },
    buttonYes: {
        backgroundColor: "#3DD598",
    },
    buttonNo: {
        backgroundColor: "red"
    }
})