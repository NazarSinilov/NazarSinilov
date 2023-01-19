import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import ArrowLeft from "/assets/ArrowLeft.svg";
import {ALL_MONTHS} from "/constants/allMonths";
import ArrowRight from "/assets/ArrowRight.svg";
import {styles} from "./stylesHeaderDate";

interface HeaderDateProps {
  incrementYear: () => void
  decrementYear: () => void
  incrementMonth: () => void
  decrementMonth: () => void
  currentDate: Date
  toggleCalendar: () => void
  isShowCalendar: boolean
}

const HeaderDate = (props: HeaderDateProps) => {
  const {
    incrementYear,
    incrementMonth,
    decrementMonth,
    decrementYear,
    currentDate,
    toggleCalendar,
    isShowCalendar
  } = props
  return (
    <View style={styles.headerDate}>
      <TouchableOpacity
        style={styles.svgArrowSize}
        onPress={() => isShowCalendar ? decrementYear() : decrementMonth()}
      >
        <ArrowLeft/>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleCalendar}>

        <Text style={styles.textHeaderDate}>
          {isShowCalendar ? currentDate.getFullYear() : ALL_MONTHS[currentDate.getMonth()]}
        </Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.svgArrowSize}
        onPress={() => isShowCalendar ? incrementYear() : incrementMonth()}
      >
        <ArrowRight/>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDate;