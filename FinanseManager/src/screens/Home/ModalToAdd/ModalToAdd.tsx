import {Text, TextInput, TouchableOpacity, View} from "react-native";
import ArrowDown from "/assets/ArrowDown.svg";
import ArrowUp from "/assets/ArrowUp.svg";
import React from "react";
import {styles} from "./stylesModalToAdd";
import DropDownByAdd from "./DropDownByAdd/DropDownByAdd";

interface ModalToAddProps {
  setSpentTrue: () => void
  setSpentFalse: () => void
  isSpent: boolean
  setValueTitleFunc: (text: string) => void
  setValuePriceFunc: (text: string) => void
  saveEditExpense: () => void
  addExpense: () => void
  valueTitle: string
  valuePrice: string
  isEdit: boolean
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  errorValidation: boolean
}

const ModalToAdd = (props: ModalToAddProps) => {

  const {
    setSpentTrue,
    isSpent,
    setSpentFalse,
    setValueTitleFunc,
    valueTitle,
    valuePrice,
    setValuePriceFunc,
    isEdit,
    saveEditExpense,
    addExpense,
    value,
    setValue,
    errorValidation
  } = props


  return (
    <View style={styles.modalContainer}>
      <View style={styles.spentBlock}>
        <TouchableOpacity
          onPress={setSpentTrue}
          style={[styles.expenseBlock, !isSpent && styles.disabled]}
        >
          <View style={[styles.expenseBackgroundIcon, styles.backgroundRed]}>
            <ArrowDown/>
          </View>
          <Text style={styles.textModal}>Расход</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={setSpentFalse}
          style={[styles.expenseBlock, isSpent && styles.disabled]}
        >
          <View style={[styles.expenseBackgroundIcon, styles.backgroundGreen]}>
            <ArrowUp/>
          </View>
          <Text style={styles.textModal}>Приход</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.border}/>

      <DropDownByAdd
        value={value}
        setValue={setValue}
      />

      <TextInput
        style={[styles.textInput, errorValidation && styles.errorValidation]}
        autoFocus={true}
        value={valueTitle}
        onChangeText={text => setValueTitleFunc(text)}
        placeholder="Описание"
      />
      <TextInput
        style={[styles.textInput, errorValidation && styles.errorValidation]}
        value={valuePrice}
        keyboardType="numeric"
        onChangeText={text => setValuePriceFunc(text)}
        placeholder="Сумма"
      />


      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => isEdit ? saveEditExpense() : addExpense()}
      >
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ModalToAdd;