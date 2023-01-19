import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View} from "react-native";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import {useRoute} from "@react-navigation/native";
import Trash from "../../../assets/Trash.svg"
import {addCategoryRequest, batchUpdateExpensesRequest, getCategories, removeCategory} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {ICategories} from "../../interface/interface";
import {removeCategoryAction, saveAllCategories} from "../../redux/expensesSlice";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import Loader from "../../components/Loader/Loader";
import {styles} from "./stylesCategories";

const Categories = ({navigation}: NativeStackNavigatorProps) => {

  const [isModalAddCategories, setIsModalAddCategories] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const allCategories = useSelector((state: RootState) => state.expenses.categories)

  useEffect(() => {
    fetchAllCategory()
  }, [])

  const fetchAllCategory = async () => {
    try {
      setIsLoading(true)
      const response = await getCategories()
      const allCategories = !response ? [] : response.map((el: string[], index: number): ICategories => ({
        name: el[0],
        id: index + 1
      }))
      const filterCategories = allCategories.filter((el: ICategories) => el.name)
      dispatch(saveAllCategories({filterCategories}))
      setIsLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addCategory = async () => {
    const trimValue = inputValue.trim()
    if (!trimValue) {
      return
    }
    try {
      setIsModalAddCategories(prevState => !prevState)
      await addCategoryRequest(trimValue)
      fetchAllCategory()
      setInputValue("")
    } catch (err) {
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
  }

  const deleteCategory = async (id: number) => {
    const backup = [...allCategories]
    try {
      dispatch(removeCategoryAction({id}))
      await removeCategory(id)
      await batchUpdateExpensesRequest(id)
    } catch (err) {
      dispatch(removeCategoryAction(backup))
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
  }

  const buttonHandler = () => {
    setIsModalAddCategories(prevState => !prevState)
  }

  const route = useRoute()

  if (isLoading) {
    return (
      <Loader/>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Мои категории</Text>
      {allCategories.length !== 0 ? <FlatList
        data={allCategories}
        style={{width: "100%"}}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchAllCategory}/>}
        renderItem={({item, index}) =>
          <View style={styles.itemWrapper}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{index + 1}.</Text>
              <Text style={[styles.itemText, {flex: 1}]}>{item.name}</Text>
              <TouchableOpacity onPress={() => deleteCategory(item.id)}>
                <Trash width={25} height={25}/>
              </TouchableOpacity>
            </View>
          </View>}
      /> : <Text style={styles.shadowText}>Добавьте категорию</Text>}

      {isModalAddCategories && <View style={styles.modalContainer}>
          <TextInput
              style={styles.textInput}
              autoFocus={true}
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Название категории"
          />
          <TouchableOpacity onPress={addCategory} style={styles.buttonSave}>
              <Text style={styles.buttonText}>Сохранить</Text>
          </TouchableOpacity>
      </View>}

      <BottomNavigation
        route={route.name}
        isButton={true}
        buttonHandler={buttonHandler}
        isAdd={isModalAddCategories}
      />

    </View>
  );
};

export default Categories;