import React, {FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./ModalWindow.style";
import {ITodo} from "../../../interface/interface";

interface ModalWindowProps {
    getItem : ITodo | null
    editTask: (
        getItem: ITodo,
        inputValue: string,
    ) => void
    addTask: (inputValue : string) => Promise<void>
}


const ModalWindow = (props : ModalWindowProps) => {
    const { getItem, editTask, addTask} = props

    const [inputValue, setInputValue] = useState<string>( getItem ? getItem.text : "")

    return (
        <View style={styles.modal}>
            <View style={styles.modalBlock}>
                <TextInput
                    placeholder="Введите название задачи"
                    autoFocus={true}
                    placeholderTextColor="#96A7AF"
                    style={styles.modalInput}
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                />
                <Pressable onPress={() => getItem ? editTask(getItem, inputValue) : addTask(inputValue) } style={styles.addTaskButton}>
                    <Text style={styles.addTaskButtonText}>Сохранить</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ModalWindow;