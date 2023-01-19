import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../../../constants/colors";
import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {saveValueCategories} from "../../../redux/expensesSlice";
import {styles} from "./stylesCategoriesDropDownByFilter";

const CategoriesDropDownByFilter = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [valueCategories, setValueCategories] = useState(0);
  const defaultCategoryForFilter = [{label: "Все категории", value: -1}]
  const [itemsCategories, setItemsCategories] = useState(defaultCategoryForFilter);
  const categories = useSelector((state: RootState) => state.expenses.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    setCategories()
  }, [categories])

  useEffect(() => {
    getCurrentCategories()
  }, [valueCategories])

  const getCurrentCategories = () => {
    dispatch(saveValueCategories({valueCategories}))
  }
  const setCategories = () => {
    const filterCategories = [...defaultCategoryForFilter, ...categoriesDropDown]
    setItemsCategories(filterCategories)
  }

  const categoriesDropDown = categories.map((el) => ({
    label: el.name,
    value: el.id
  }))

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={openCategories}
        value={valueCategories}
        items={itemsCategories}
        setOpen={setOpenCategories}
        setValue={setValueCategories}
        setItems={setItemsCategories}
        listItemLabelStyle={{
          color: colors.BLACK
        }}
        style={{backgroundColor: colors.BACKGROUND_DATA}}
        textStyle={{color: colors.LIGHT_GREEN}}
        labelStyle={{
          color: colors.WHITE
        }}
        placeholder="Выберите категорию"
      />
    </View>
  );
};

export default CategoriesDropDownByFilter;