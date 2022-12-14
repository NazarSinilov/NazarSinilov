import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    itemCard: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#30444E",
        padding: 14,
        borderRadius: 25,
        marginBottom: 24,

    },
    disabledCard : {
        backgroundColor: "#414D5388",
    },
    disabled: {
        opacity: 0.5
    },

    flex: {
        flex: 1
    },
    switchCard: {
        marginRight: 10,
    },
    content: {
        flexDirection: "row",
    },
    cardData: {
        flex: 1,
        color: "#96A7AF",
        fontSize: 12
    },
    cardText: {
        color: "#FFFFFF",
        fontSize: 18,
        flex: 1,
    },
    cardIcon: {
        fontSize: 22,
        marginLeft: 10
    }
})