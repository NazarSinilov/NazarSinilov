import React from 'react';
import { Switch, Text, View} from "react-native";
import {styles} from "./CardTodo.style";
import {getDate} from "../../../utils/getDate";
import {ITodo} from "../../../interface/interface";

interface CardTodoProps {
    item: ITodo
    getEditTaskItem: (item : ITodo) => void
    toggleSwitch: (item : ITodo) => void
    showDialog: (item : ITodo) => void
}


const CardTodo = (props: CardTodoProps) => {
    const {item, getEditTaskItem, toggleSwitch, showDialog} = props
    const {text, isCheck, date} = item

    const time: string = getDate(new Date(date))

    return (
        <View style={isCheck ? [styles.itemCard , styles.disabledCard] : styles.itemCard}>
            <View style={[styles.content, styles.flex]}>
                <Switch
                    style={styles.switchCard}
                    trackColor={{false: "#767577", true: "#3DD598"}}
                    thumbColor={isCheck ? "#3DD598" : "#767577"}
                    value={isCheck}
                    onValueChange={() => toggleSwitch(item)}/>
                <View style={isCheck ? [styles.flex, styles.disabled] : styles.flex}>
                    <Text style={styles.cardData}>{time}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text
                    onPress={() => getEditTaskItem(item)}
                    style={isCheck? {display: "none"} : styles.cardIcon}
                >✏️</Text>
                <Text onPress={() => showDialog(item)} style={styles.cardIcon}>❌</Text>
            </View>
        </View>
    );
};

export default CardTodo;