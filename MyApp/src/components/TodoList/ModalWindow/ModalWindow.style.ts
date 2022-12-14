import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    modalBlock: {
        height: 152,
        width: "90%",
        backgroundColor: "#475E69",
        marginBottom: 10,
        borderRadius: 25,
        alignItems: "center",
        padding: 10
    },
    modalInput: {
        width: "90%",
        height: 42,
        borderRadius: 12,
        color: "#FFFFFF",
        padding: 10,
        backgroundColor: "#30444E",
        margin: 10
    },
    addTaskButton: {
        marginTop: 5,
        borderRadius: 12,
        width: "90%",
        backgroundColor: "#3DD598",
        height: 58,
        alignItems: "center",
        justifyContent: "center"
    },
    addTaskButtonText: {
        fontSize: 16,
        fontStyle: "italic"
    },
})