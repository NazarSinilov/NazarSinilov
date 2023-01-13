import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {styles} from "./stylesCalendar";

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

export default Calendar;