import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput, ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {colors} from "../../constans/colors";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import {useRoute} from "@react-navigation/native";
import React, {useEffect, useMemo, useState} from "react";
import ArrowLeft from "../../../assets/ArrowLeft.svg"
import ArrowRight from "../../../assets/ArrowRight.svg"
import ArrowUp from "../../../assets/ArrowUp.svg"
import ArrowDown from "../../../assets/ArrowDown.svg"
import GreenEllipse from "../../../assets/greenEllipse.svg"
import RedEllipse from "../../../assets/redEllipse.svg"
import {ALL_MONTHS} from "../../constans/allMonths"
import Calendar from "../../components/Calendar/Calendar";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import { IExpense} from "../../interface/interface";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import Loader from "../../components/Loader/Loader";
import {
    addExpenseRequest,
    createGoogleTable,
    getExpensesRequest,
    googleDriveInfo, removeExpenseRequest,
} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {removeExpenseAction, saveAllExpenses, saveTableId} from "../../Redux/expensesSlice";
import {RootState} from "../../Redux/store";
import DropDownPicker from 'react-native-dropdown-picker';
import {sortExpensesByDate} from "../../utils/sortExpensesByDate";
import {getFilterExpensesByDate} from "../../utils/getFilterExpensesByDate";
import {getFilterExpensesByCategory} from "../../utils/getFilterExpensesByCategory";
/*
import notifee from '@notifee/react-native';
*/
let timeout: number = 0

const Home = ({navigation}: NativeStackNavigatorProps) => {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [isShowCalendar, setIsShowCalendar] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalAddExpense, setIsModalAddExpense] = useState(false)
    const [isSpent, setIsSpent] = useState(true)
    const [valueTitle, setValueTitle] = useState("")
    const [valuePrice, setValuePrice] = useState("")
    const [completeMessage, setCompleteMessage] = useState("")

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
    const dispatch = useDispatch()

    const categoriesDropDown = categories.map((el) => ({
        label: el.name,
        value: el.id
    }))

    useEffect(() => {
        tableValidation()
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


    const fetchCategories = async () => {
        try {
            setIsLoading(true)
            const response = await getExpensesRequest()
            transformData(response)
        } catch (err) {
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        } finally {
            setIsLoading(false)
        }
    }

    const transformData = (arr: string[][]) => {
        const newArr: IExpense[] = arr.map((el: string[], index): IExpense => ({
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
            await fetchCategories()
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


    /*    async function onDisplayNotification() {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            await notifee.displayNotification({
                title: 'Notification Title',
                body: 'Main body content of the notification',
                android: {
                    channelId,
                    smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                    // pressAction is needed if you want the notification to open the app when pressed
                    pressAction: {
                        id: 'default',
                    },
                },
            });
        }*/
    {/*
            <Button title="Display Notification" onPress={() => onDisplayNotification()} />
*/
    }

    const toggleCalendar = () => {
        setIsShowCalendar(prevState => !prevState)
    }

    const setDate = (index: number) => {
        const date = new Date(currentDate.setMonth(index))
        setCurrentDate(date)
    }

    const incrementYear = () => {
        const date = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
        setCurrentDate(date)
    }
    const decrementYear = () => {
        const date = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        setCurrentDate(date)
    }
    const incrementMonth = () => {
        const date = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        setCurrentDate(date)
    }
    const decrementMonth = () => {
        const date = new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        setCurrentDate(date)
    }

    const buttonHandler = () => {
        setIsModalAddExpense(prevState => !prevState)
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

    const addExpense = async () => {
        const valueTitleTrim = valueTitle.trim()
        if (!valueTitleTrim) {
            showToastrText()
            setIsModalAddExpense(false)
            return
        }
        if (!valuePrice) {
            showToastrPrice()
            setIsModalAddExpense(false)
            return
        }
        if (+valuePrice <= 0) {
            showToastrPositivePrice()
            setIsModalAddExpense(false)
            return
        }
        const backup = [...allExpenses]
        try {
            const date = new Date().getTime()
            const newExpense = [valueTitle, valuePrice, isSpent, date, value]
            await addExpenseRequest(newExpense)
            setValuePrice("")
            setValueTitle("")
            setValue(0)
            successMessage("Транзакция добавлена")
            await fetchCategories()
        } catch (err) {
            dispatch(saveAllExpenses({backup}))
            if (err instanceof Error) {
                navigation.navigate("Error", {errorMessage: err.message})
            }
        } finally {
            setIsModalAddExpense(false)
        }
    }

    const route = useRoute()
    const currentMonth = currentDate.getMonth()

    const memoExpenses: IExpense[] = useMemo(() =>
            sortExpensesByDate([...allExpenses])
        , [allExpenses])


    const filterExpensesByDate = getFilterExpensesByDate([...memoExpenses], currentDate)

    const filterExpensesByCategory = getFilterExpensesByCategory([...filterExpensesByDate] , valueCategories, items)
        
    const totalPrice: number = memoExpenses.reduce((acc, el) => {
        if (el.isSpent) {
            return acc - el.price
        } else {
            return acc + el.price
        }
    }, 0)

    if (isLoading) {
        return (
            <Loader/>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerDate}>
                <TouchableOpacity
                    style={styles.svgArrowSize}
                    onPress={() => isShowCalendar ? decrementYear() : decrementMonth()}
                >
                    <ArrowLeft/>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleCalendar}>
                    {isShowCalendar
                        ? <Text style={styles.textHeaderDate}>{currentDate.getFullYear()}</Text>
                        : <Text style={styles.textHeaderDate}>{ALL_MONTHS[currentDate.getMonth()]}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.svgArrowSize}
                    onPress={() => isShowCalendar ? incrementYear() : incrementMonth()}
                >
                    <ArrowRight/>
                </TouchableOpacity>
            </View>

            <View style={styles.monthsListContainer}>
                {isShowCalendar && <FlatList
                    data={ALL_MONTHS}
                    numColumns={3}
                    style={styles.monthsList}
                    renderItem={({item, index}) =>
                        <Calendar
                            item={item}
                            index={index}
                            setDate={setDate}
                            currentMonth={currentMonth}
                        />
                    }
                />}
            </View>

            {!isShowCalendar
                && <View style={styles.balanceContainer}>
                    <View style={[styles.balanceBlock, styles.currentBalance]}>
                        {totalPrice > 0
                            ? <GreenEllipse/>
                            : <RedEllipse/>
                        }
                        <Text style={styles.currentBalanceText}>Текущий баланс</Text>
                        <Text style={styles.balancePrice}>
                            {(+totalPrice.toFixed(2)).toLocaleString()} P
                        </Text>
                    </View>
                    <View style={[styles.balanceBlock, styles.predictionBalance]}>
                        <Text style={styles.predictionBalanceText}>
                            Прогноз баланса на конец месяца
                        </Text>
                        <Text style={styles.balancePrice}>
                            1 000.00 P
                        </Text>
                    </View>
                </View>
            }
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


            <FlatList
                data={filterExpensesByCategory}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchCategories}/>}
                renderItem={({item}) => <ExpenseItem
                    item={item}
                    deleteExpense={deleteExpense}
                />}
            />


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
                    onPress={addExpense}
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
    headerDate: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textHeaderDate: {
        fontSize: 16,
        color: "white"
    },
    monthsListContainer: {
        backgroundColor: colors.LIGHT_GRAY,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        marginBottom: 10
    },
    monthsList: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    svgArrowSize: {
        padding: 10
    },
    balanceContainer: {
        marginHorizontal: 15,
        marginVertical: 20
    },
    balanceBlock: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    currentBalance: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    currentBalanceText: {
        color: "#FCFCFC",
        fontSize: 16,
        flex: 1,
        marginLeft: 5
    },
    balancePrice: {
        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },
    predictionBalance: {
        alignItems: "center",
    },
    predictionBalanceText: {
        fontSize: 14,
        color: "#FCFCFC"
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
    }
})

export default Home;