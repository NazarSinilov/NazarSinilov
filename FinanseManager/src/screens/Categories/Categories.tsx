import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../constans/colors";
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
            const allCategories = !response ? [] : response.map((el : string[], index: number): ICategories => ({
                name: el[0],
                id: index + 1
            }))
            const filterCategories = allCategories.filter((el : ICategories)  => el.name)
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

    const deleteCategory = async (id : number) => {
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
            <Loader />
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
                    onChangeText={(text) => setInputValue(text) }
                    placeholder="Название категории"
                />
                <TouchableOpacity onPress={() => addCategory()} style={styles.buttonSave}>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        alignItems: "center"
    },
    headerText: {
        color: colors.WHITE,
        fontSize: 24,
        marginVertical: 40
    },
    itemWrapper: {
        paddingHorizontal: 15,
        width: "100%",
        marginBottom: 20
    },
    item: {
        backgroundColor: colors.BACKGROUND_DATA,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        width: "100%"

    },
    itemText: {
        color: colors.WHITE,
        fontSize: 20,
        marginRight: 5
    },
    modalContainer: {
        backgroundColor: colors.LIGHT_GRAY,
        paddingVertical: 20,
        borderRadius: 25,
        position: "absolute",
        bottom: 120,
        left: 15,
        right: 15
    },
    textInput: {
        backgroundColor: colors.BACKGROUND,
        padding: 10,
        marginHorizontal: 22,
        marginVertical: 10,
        borderRadius: 12
    },
    buttonSave: {
        backgroundColor: colors.LIGHT_GREEN,
        marginVertical: 10,
        borderRadius: 12,
        marginHorizontal: 22,
        paddingVertical: 14,
        alignItems: "center"
    },
    buttonText: {
        color: colors.BLACK,
        fontSize: 16
    },
    shadowText: {
        fontSize: 18
    }

})
export default Categories;