import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {colors} from "../../constans/colors";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import {useRoute} from "@react-navigation/native";
import React, {useEffect, useMemo, useState} from "react";
import ArrowUp from "../../../assets/ArrowUp.svg"
import ArrowDown from "../../../assets/ArrowDown.svg"
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {IExpense} from "../../interface/interface";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import Loader from "../../components/Loader/Loader";
import {
    addExpenseRequest,
    createGoogleTable, editExpenseRequest,
    getExpensesRequest,
    googleDriveInfo,
    removeExpenseRequest,
} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {
    editExpenseAction,
    removeExpenseAction,
    saveAllExpenses,
    saveTableId
} from "../../redux/expensesSlice";
import {RootState} from "../../redux/store";
import DropDownPicker from 'react-native-dropdown-picker';
import {sortExpensesByDate} from "../../utils/sortExpensesByDate";
import {getFilterExpensesByDate} from "../../utils/getFilterExpensesByDate";
import {getFilterExpensesByCategory} from "../../utils/getFilterExpensesByCategory";
import {getSynchronizationTime} from "../../redux/userConfigSlice";
import HeaderDateContainer from "./HeaderDateContainer/HeaderDateContainer";
import MonthsList from "./MonthsList/MonthsList";
import BalanceContainer from "./BalanceContainer/BalanceContainer";
import Graph from "./Graph/Graph";
let timeout: number = 0

const Home = ({navigation}: NativeStackNavigatorProps) => {

    const [isLoading, setIsLoading] = useState(true)
    const [isModalAddExpense, setIsModalAddExpense] = useState(false)
    const [isSpent, setIsSpent] = useState(true)
    const [valueTitle, setValueTitle] = useState("")
    const [valuePrice, setValuePrice] = useState("")
    const [completeMessage, setCompleteMessage] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [modifiableItem, setModifiableItem] = useState<IExpense>()
    const [openGraph, setOpenGraph] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [openCategories, setOpenCategories] = useState(false);
    const [valueCategories, setValueCategories] = useState(0);

    const defaultCategory = [{label: "Без категории", value: 0}]
    const defaultCategoryForFilter = [{label: "Все категории", value: -1}]

    const [items, setItems] = useState(defaultCategory);
    const [itemsCategories, setItemsCategories] = useState(defaultCategoryForFilter);

    const allExpenses = useSelector((state: RootState) => state.expenses.allExpenses)
    const categories = useSelector((state: RootState) => state.expenses.categories)
    const currentDateString = useSelector((state: RootState) => state.expenses.currentDate)
    const currentDate = new Date(currentDateString)
    const isShowCalendar = useSelector((state: RootState) => state.expenses.isShowCalendar)

    const dispatch = useDispatch()

    const categoriesDropDown = categories.map((el) => ({
        label: el.name,
        value: el.id
    }))

    useEffect(() => {
        tableValidation()
    }, [])

    useEffect(() => {
        setCategories()
    }, [categories])



    const setCategories = () => {
        const newCategories = [...defaultCategory, ...categoriesDropDown]
        const filterCategories = [...defaultCategoryForFilter, ...categoriesDropDown]
        setItems(newCategories)
        setItemsCategories(filterCategories)
    }

    const deleteExpense = async (id: number) => {
        const backup = [...allExpenses]
        try {
            dispatch(removeExpenseAction({id}))
            await removeExpenseRequest(id)
        } catch (err) {
            dispatch(saveAllExpenses({backup}))
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        }
    }

    const fetchExpenses = async () => {
        try {
            setIsLoading(true)
            const response = await getExpensesRequest()
            transformData(response)
            const synchronizationDate = new Date()
            dispatch(getSynchronizationTime({synchronizationDate}))
        } catch (err) {
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        } finally {
            setIsLoading(false)
        }
    }

    const transformData = (arr: string[][]) => {
        const newArr: IExpense[] = !arr ? [] : arr.map((el: string[], index): IExpense => ({
            title: el[0],
            price: +el[1],
            isSpent: el[2] === "TRUE",
            date: new Date(+el[3]),
            categoryId: +el[4],
            id: index + 1
        }))
        const filterExpense = newArr.filter((el) => el.title && el.price)
        dispatch(saveAllExpenses({filterExpense}))
    }


    const tableValidation = async () => {
        const tableId = await checkGoogleDrive()
        dispatch(saveTableId({tableId}))
        if (!tableId) {
            await createTable()
        } else {
            await fetchExpenses()
        }
    }

    const checkGoogleDrive = async () => {
        try {
            const result = await googleDriveInfo()
            return result[0].id
        } catch (err) {
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        }
    }

    const createTable = async () => {
        try {
            await createGoogleTable()
        } catch (err) {
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        }
    }



    const setOpenGraphFunc = () => {
        setOpenGraph(prevState => !prevState)
    }



    const buttonHandler = () => {
        setIsModalAddExpense(prevState => !prevState)
        setIsEdit(false)
        clearForm()
    }


    const successMessage = (message: string) => {
        setCompleteMessage(message)
        clearTimeout(timeout)
        timeout = setTimeout(() => setCompleteMessage(""), 2000)
    }

    const showToastrText = () => {
        ToastAndroid.showWithGravity("Введите текст!", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
    const showToastrPositivePrice = () => {
        ToastAndroid.showWithGravity("Введите положительное значение!", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
    const showToastrPrice = () => {
        ToastAndroid.showWithGravity("Введите сумму трнзакции!", ToastAndroid.SHORT, ToastAndroid.TOP);
    }

    const editExpense = async (item: IExpense) => {
        buttonHandler()
        setIsEdit(true)
        setValueTitle(item.title)
        setValuePrice(item.price.toString())
        setValue(item.categoryId)
        setIsSpent(item.isSpent)
        setModifiableItem(item)
    }

    const saveEditExpense = async () => {
        if (!modifiableItem) {
            return
        }
        const backup = [...allExpenses]
        try {
            const date = modifiableItem.date.getTime()
            const newExpenseByTable = [valueTitle.trim(), valuePrice, isSpent, date, value]
            const newExpense: IExpense = {
                title: valueTitle.trim(),
                price: +valuePrice,
                date: modifiableItem.date,
                isSpent,
                id: modifiableItem.id,
                categoryId: modifiableItem.categoryId
            }
            dispatch(editExpenseAction({newExpense}))
            setIsModalAddExpense(false)
            successMessage("Транзакция изменена")
            await editExpenseRequest(newExpenseByTable, modifiableItem.id)
        } catch (err) {
            dispatch(saveAllExpenses({backup}))
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        } finally {
            setIsEdit(false)
            clearForm()
        }
    }

    const validationForm = (): boolean => {
        const valueTitleTrim = valueTitle.trim()
        if (!valueTitleTrim) {
            showToastrText()
            setIsModalAddExpense(false)
            return false
        }
        if (!valuePrice) {
            showToastrPrice()
            setIsModalAddExpense(false)
            return false
        }
        if (+valuePrice <= 0) {
            showToastrPositivePrice()
            setIsModalAddExpense(false)
            return false
        }
        return true
    }

    const addExpense = async () => {
        if (!validationForm()) return
        setIsEdit(false)
        const backup = [...allExpenses]
        try {
            const date = new Date().getTime()
            const newExpense = [valueTitle.trim(), valuePrice, isSpent, date, value]
            await addExpenseRequest(newExpense)
            clearForm()
            successMessage("Транзакция добавлена")
            await fetchExpenses()
        } catch (err) {
            dispatch(saveAllExpenses({backup}))
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        } finally {
            setIsModalAddExpense(false)
        }
    }

    const clearForm = () => {
        setValuePrice("")
        setValueTitle("")
        setValue(0)
        setIsSpent(true)
    }

    const route = useRoute()

    const memoExpenses: IExpense[] = useMemo(() =>
            sortExpensesByDate([...allExpenses])
        , [allExpenses])


    const filterExpensesByDate = getFilterExpensesByDate([...memoExpenses], currentDate)

    const filterExpensesByCategory = getFilterExpensesByCategory([...filterExpensesByDate], valueCategories)

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <View style={styles.container}>
            <HeaderDateContainer />
            {isShowCalendar && <MonthsList />}

            {!isShowCalendar && <BalanceContainer
                memoExpenses={memoExpenses}
                setOpenGraphFunc={setOpenGraphFunc}
                openGraph={openGraph}
            />}

            {openGraph && <Graph filterExpensesByDate={filterExpensesByDate}/>}

            <View style={{marginHorizontal: 15, marginVertical: 10}}>
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

            {allExpenses.length !== 0 ? <FlatList
                data={filterExpensesByCategory}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchExpenses}/>}
                renderItem={({item}) => <ExpenseItem
                    item={item}
                    deleteExpense={deleteExpense}
                    editExpense={editExpense}
                />}
            /> : <Text style={styles.shadowText}>Добавьте транзакцию</Text>}


            {isModalAddExpense && <View style={styles.modalContainer}>
                <View style={styles.spentBlock}>
                    <TouchableOpacity
                        onPress={() => setIsSpent(true)}
                        style={[styles.expenseBlock, !isSpent && styles.disabled]}
                    >
                        <View style={[styles.expenseBackgroundIcon, styles.backgroundRed]}>
                            <ArrowDown/>
                        </View>
                        <Text style={styles.textModal}>Расход</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsSpent(false)}
                        style={[styles.expenseBlock, isSpent && styles.disabled]}
                    >
                        <View style={[styles.expenseBackgroundIcon, styles.backgroundGreen]}>
                            <ArrowUp/>
                        </View>
                        <Text style={styles.textModal}>Приход</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.border}/>

                <View style={{paddingHorizontal: 20}}>
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
                        style={{backgroundColor: colors.BACKGROUND, marginTop: 10}}
                        textStyle={{color: colors.LIGHT_GREEN}}
                        labelStyle={{
                            color: colors.WHITE
                        }}
                        placeholder="Выберите категорию"
                    />
                </View>

                <TextInput
                    style={styles.textInput}
                    autoFocus={true}
                    value={valueTitle}
                    onChangeText={text => setValueTitle(text)}
                    placeholder="Описание"
                />
                <TextInput
                    style={styles.textInput}
                    value={valuePrice}
                    keyboardType="numeric"
                    onChangeText={text => setValuePrice(text)}
                    placeholder="Сумма"
                />


                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => isEdit ? saveEditExpense() : addExpense()}
                >
                    <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>


            </View>}

            {completeMessage && <View style={styles.modal}>
                <View style={styles.alertComplete}>
                    <Text style={styles.alertCompleteText}>{completeMessage}</Text>
                </View>
            </View>}

            <BottomNavigation
                route={route.name}
                isButton={true}
                buttonHandler={buttonHandler}
                isAdd={isModalAddExpense}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        paddingBottom: 100
    },

    modalContainer: {
        backgroundColor: colors.LIGHT_GRAY,
        paddingVertical: 10,
        borderRadius: 25,
        position: "absolute",
        bottom: 110,
        left: 15,
        right: 15,
        zIndex: 10001,

    },
    spentBlock: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    expenseBlock: {
        flexDirection: "row",
        alignItems: "center"
    },
    expenseBackgroundIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundRed: {
        backgroundColor: colors.RED
    },
    backgroundGreen: {
        backgroundColor: colors.LIGHT_GREEN
    },
    disabled: {
        opacity: 0.5
    },
    textModal: {
        color: colors.WHITE,
        fontSize: 16
    },
    border: {
        borderBottomWidth: 5,
        borderBottomColor: "#8d9695"
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
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    alertComplete: {
        height: 50,
        width: "70%",
        backgroundColor: "#286053",
        marginBottom: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    alertCompleteText: {
        color: colors.LIGHT_GREEN,
        fontSize: 16,
        fontStyle: "italic"
    },
    shadowText: {
        fontSize: 18,
        paddingLeft: 20
    }
})

export default Home;