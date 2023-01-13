import {Text, TouchableOpacity, View} from "react-native";
import GreenEllipse from "../../../../../assets/greenEllipse.svg";
import RedEllipse from "../../../../../assets/redEllipse.svg";
import React from "react";
import {styles} from "./stylesBalance";

interface BalanceProps{
    totalPrice: number
    isRest: boolean
    predictBalance: number
    setOpenGraphFunc: () => void
    openGraph: boolean
}

const Balance = ({totalPrice, isRest, predictBalance, setOpenGraphFunc, openGraph} : BalanceProps) => {

    return (
        <View style={styles.balanceContainer}>
            <View style={[styles.balanceBlock, styles.currentBalance]}>
                {totalPrice > 0
                    ? <GreenEllipse/>
                    : <RedEllipse/>
                }
                <Text style={styles.currentBalanceText}>Текущий баланс</Text>
                <Text style={styles.balancePrice}>
                    {(+totalPrice.toFixed(2)).toLocaleString()} P
                </Text>
            </View>

            {isRest && <TouchableOpacity
                onPress={() => setOpenGraphFunc()}
                style={[styles.balanceBlock, styles.predictionBalance]}
            >
                <Text style={styles.predictionBalanceText}>
                    Прогноз баланса на конец месяца
                </Text>
                <Text style={styles.balancePrice}>
                    {predictBalance} P
                </Text>
                <Text style={styles.predictionOpenGraph}>
                    Кликните чтобы {openGraph ? "закрыть" : "открыть"} график
                </Text>
            </TouchableOpacity>}
        </View>
    );
};

export default Balance;