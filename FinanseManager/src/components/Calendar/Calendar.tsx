import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors} from "../../constans/colors";

interface CalendarProps {
    item: string
    index: number
    setDate: (index: number) => void
    currentMonth: number
}

const Calendar = ( props: CalendarProps) => {

    const {item, index, setDate, currentMonth} = props

    return (
        <TouchableOpacity
            style={currentMonth === index
                ? [styles.itemBlock, styles.activeItem]
                : styles.itemBlock }
            onPress={() => setDate(index)}
        >
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    itemBlock: {
        width: 100,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    activeItem: {
        backgroundColor: colors.BACKGROUND_DATA
    },
    itemText : {
        fontSize: 16,
        color: "white"
    }
})
export default Calendar;