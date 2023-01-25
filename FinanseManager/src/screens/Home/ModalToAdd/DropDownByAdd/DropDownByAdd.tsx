import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "/constants/colors";
import {View} from "react-native";
import {styles} from "./stylesDropDownByAdd";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "/redux/store";

interface DropDownByAddProps {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const DropDownByAdd = ({value, setValue}: DropDownByAddProps) => {
  const [open, setOpen] = useState(false);
  const defaultCategory = [{label: "Без категории", value: 0}]
  const [items, setItems] = useState(defaultCategory);
  const categories = useSelector((state: RootState) => state.expenses.categories)

  const categoriesDropDown = categories.map((el) => ({
    label: el.name,
    value: el.id
  }))

  useEffect(() => {
    setCategories()
  }, [categories])

  const setCategories = () => {
    const newCategories = [...defaultCategory, ...categoriesDropDown]
    setItems(newCategories)
  }

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listItemLabelStyle={{
          color: colors.BLACK
        }}
        style={styles.dropDownPicker}
        textStyle={{color: colors.LIGHT_GREEN}}
        labelStyle={{
          color: colors.WHITE
        }}
        placeholder="Выберите категорию"
      />
    </View>
  );
};

export default DropDownByAdd;