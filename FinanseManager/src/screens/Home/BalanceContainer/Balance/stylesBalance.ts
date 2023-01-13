import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    balanceContainer: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    balanceBlock: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    currentBalance: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    currentBalanceText: {
        color: "#FCFCFC",
        fontSize: 16,
        flex: 1,
        marginLeft: 5
    },
    balancePrice: {
        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },
    predictionBalance: {
        alignItems: "center",
    },
    predictionBalanceText: {
        fontSize: 14,
        color: "#FCFCFC"
    },
    predictionOpenGraph: {
        fontSize: 12,
        color: "#ababab"
    },
})
