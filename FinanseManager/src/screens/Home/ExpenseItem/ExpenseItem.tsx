import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {IExpense} from "../../../interface/interface";
import ArrowBottom from "../../../../assets/ArrowDown.svg"
import ArrowTop from "../../../../assets/ArrowUp.svg"
import ArrowRight from "../../../../assets/ArrowRight.svg"
import Edit from "../../../../assets/Edit.svg"
import Trash from "../../../../assets/Trash.svg"
import {colors} from "../../../constans/colors";
import {getDate} from "../../../utils/getDate";

interface ExpenseItemProps {
    item: IExpense
    deleteExpense: (id: number) => void
    editExpense: (item: IExpense) => void
}

const ExpenseItem = (props: ExpenseItemProps) => {
    const {item, deleteExpense, editExpense} = props
    return (
        <View style={styles.container}>
            <View style={[styles.arrowBlock, item.isSpent
                ? styles.arrowBlockRed
                : styles.arrowBlockGreen]}
            >
                {item.isSpent
                    ? <ArrowBottom/>
                    : <ArrowTop/>
                }
            </View>

            <TouchableOpacity style={styles.textContainer}>
                <View style={styles.textBlock}>
                    <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                    <Text style={item.isSpent ? styles.red : styles.green}>{item.price} ₽</Text>
                </View>
                {item.title.length > 16 && <ArrowRight />}
            </TouchableOpacity>

            <View style={styles.rightSide}>
                <Text style={styles.date}>{getDate(item.date)}</Text>
                <View style={styles.controlButton}>
                    <TouchableOpacity onPress={() => editExpense(item)} style={styles.svgBlock}>
                        <Edit width={25} height={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.svgBlock}>
                        <Trash  width={25} height={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.BACKGROUND_DATA,
        borderRadius: 25
    },
    arrowBlock: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,

    },
    arrowBlockRed: {
        backgroundColor: colors.RED
    },
    arrowBlockGreen: {
        backgroundColor: colors.LIGHT_GREEN
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    textBlock: {
        width: 120,
        marginRight: 10
    },
    title: {
        color: colors.WHITE,
        marginBottom: 2
    },
    red: {
        color: colors.RED
    },
    green: {
        color: colors.LIGHT_GREEN
    },
    date: {
        fontSize: 10,
        color: "#96A7AF",
        marginBottom: 6
    },
    controlButton: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    rightSide : {
        alignItems: "center"
    },
    svgBlock : {
        padding: 5
    }

})
export default ExpenseItem;