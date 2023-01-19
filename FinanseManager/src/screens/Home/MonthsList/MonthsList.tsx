import {FlatList, View} from "react-native";
import {ALL_MONTHS} from "../../../constants/allMonths";
import Calendar from "../../../components/Calendar/Calendar";
import React, {useCallback} from "react";
import {styles} from "./stylesMonthsList";
import {saveCurrentDate} from "../../../redux/expensesSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const MonthsList = () => {
  const currentDateString = useSelector((state: RootState) => state.expenses.currentDate)
  const currentDate = new Date(currentDateString)
  const dispatch = useDispatch()
  const currentMonth = currentDate.getMonth()

  const setDate = (index: number) => {
    const date = new Date(currentDate.setMonth(index))
    dispatch(saveCurrentDate({date}))
  }

  const renderItem = useCallback((item: string, index: number) =>
      <Calendar
        item={item}
        index={index}
        setDate={setDate}
        currentMonth={currentMonth}
      />
    , [ALL_MONTHS])

  return (
    <View style={styles.monthsListContainer}>
      <FlatList
        data={ALL_MONTHS}
        numColumns={3}
        style={styles.monthsList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default MonthsList;