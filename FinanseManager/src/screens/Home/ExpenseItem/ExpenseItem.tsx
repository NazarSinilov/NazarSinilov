import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {IExpense} from "/interface/interface";
import ArrowBottom from "/assets/ArrowDown.svg"
import ArrowTop from "/assets/ArrowUp.svg"
import ArrowRight from "/assets/ArrowRight.svg"
import Edit from "/assets/Edit.svg"
import Trash from "/assets/Trash.svg"
import {getDate} from "/utils/getDate";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "/navigation/RootStackParamList";
import {styles} from "./stylesExpenseItem";

interface ExpenseItemProps {
  item: IExpense
  deleteExpense: (id: number) => void
  editExpense: (item: IExpense) => void
}

const ExpenseItem = (props: ExpenseItemProps) => {
  const {item, deleteExpense, editExpense} = props
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

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

      <TouchableOpacity
        onPress={() => navigation.navigate("Expenses", {id: item.id, categoryId: item.categoryId})}
        style={styles.textContainer}>
        <View style={styles.textBlock}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text style={item.isSpent ? styles.red : styles.green}>{item.price} ₽</Text>
        </View>
        {item.title.length > 16 && <ArrowRight/>}
      </TouchableOpacity>

      <View style={styles.rightSide}>
        <Text style={styles.date}>{getDate(item.date)}</Text>
        <View style={styles.controlButton}>
          <TouchableOpacity onPress={() => editExpense(item)} style={styles.svgBlock}>
            <Edit width={25} height={25}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.svgBlock}>
            <Trash width={25} height={25}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExpenseItem;