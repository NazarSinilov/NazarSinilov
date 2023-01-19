import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "/components/BottomNavigation/BottomNavigation";
import React, {useCallback, useMemo, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "/navigation/RootStackParamList";
import {useSelector} from "react-redux";
import {RootState} from "/redux/store";
import {getFilterExpensesByCategory} from "/utils/getFilterExpensesByCategory";
import ArrowBottom from "/assets/ArrowDown.svg";
import ArrowTop from "/assets/ArrowUp.svg";
import ArrowRight from "/assets/ArrowRight.svg";
import {getDate} from "/utils/getDate";
import {styles} from "./stylesExpenses";
import {HEIGHT} from "/constants/constants";
import {IExpense} from "/interface/interface";

type ErrorProps = NativeStackScreenProps<RootStackParamList, "Expenses">

const Expenses = ({route}: ErrorProps) => {
  const {id, categoryId} = route.params
  const [isOpenExpense, setIsOpenExpense] = useState(false)
  const allExpenses = useSelector((state: RootState) => state.expenses.allExpenses)
  const categories = useSelector((state: RootState) => state.expenses.categories)

  const filterExpensesByCategory = getFilterExpensesByCategory([...allExpenses], categoryId)
  const getCurrentIndex = () => {
    return filterExpensesByCategory.findIndex((el) => el.id === id)
  }

  const currentIndex = useMemo(() => getCurrentIndex(), [filterExpensesByCategory])
  const getCurrentCategory = () => {
    if (!filterExpensesByCategory[0].categoryId) {
      return "без категории"
    }
    const currentCategory = categories.filter((el) => el.id === filterExpensesByCategory[0].categoryId)
    return currentCategory[0].name
  }

  const renderItem = useCallback((item: IExpense) =>
    <View style={styles.itemWrapper}>
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

        <TouchableOpacity
          onPress={() => item.title.length > 14 && setIsOpenExpense(prevState => !prevState)}
          style={styles.textContainer}
        >
          <View style={styles.textBlock}>
            <Text numberOfLines={isOpenExpense ? undefined : 1} style={styles.title}>{item.title}</Text>
            <Text style={item.isSpent ? styles.red : styles.green}>{item.price} ₽</Text>
          </View>

          {item.title.length > 14 && <ArrowRight style={isOpenExpense && {transform: [{rotate: "90deg"}]}}/>}
        </TouchableOpacity>

        <View style={styles.rightSide}>
          <Text style={styles.date}>{getDate(item.date)}</Text>
        </View>
      </View>
    </View>, [filterExpensesByCategory])

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>Транзакции в категории "{getCurrentCategory()}"</Text>
      </View>
      <FlatList
        data={filterExpensesByCategory}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => (
          {length: HEIGHT, offset: HEIGHT * index, index}
        )}
        snapToAlignment={"start"}
        snapToInterval={HEIGHT}
        decelerationRate={"fast"}
        maxToRenderPerBatch={15}
        ListHeaderComponent={<View style={{height: HEIGHT}}/>}
        ListFooterComponent={<View style={{height: HEIGHT}}/>}
        viewabilityConfig={{
          minimumViewTime: 10,
          itemVisiblePercentThreshold: 100,
          waitForInteraction: false,
        }}
        initialScrollIndex={currentIndex}
        renderItem={({item}) => renderItem(item)}
      />

      <BottomNavigation
        route={route.name}
        isButton={false}
      />
    </View>
  );
};

export default Expenses;
