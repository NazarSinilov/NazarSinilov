import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#23333a",
        paddingTop: 66
    },
    todoList: {
        paddingHorizontal: 19,
    },
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
    footer: {
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: "100%",
        backgroundColor: "#30444E",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,


    },
    footerIcon: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    footerAdd: {
        backgroundColor: "#3DD598"
    },
    footerCancel: {
        backgroundColor: "#fd565e"
    },
    footerIconAdd: {
        width: 20,
        height: 20
    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },

    alertComplete: {
        height: 68,
        width: "80%",
        backgroundColor: "#286053",
        marginBottom: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    alertCompleteText: {
        color: "#3DD598",
        fontSize: 14,
        fontStyle: "italic"
    }
})

