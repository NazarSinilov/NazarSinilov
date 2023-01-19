import {
  Text,
  ToastAndroid,
  View
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import {useRoute} from "@react-navigation/native";
import React, {useMemo, useState} from "react";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {IExpense} from "/interface/interface";
import {addExpenseRequest, editExpenseRequest} from "/api/API";
import {useDispatch, useSelector} from "react-redux";
import {addExpenseAction, editExpenseAction, saveAllExpenses} from "/redux/expensesSlice";
import {RootState} from "/redux/store";
import {sortExpensesByDate} from "/utils/sortExpensesByDate";
import {getFilterExpensesByDate} from "/utils/getFilterExpensesByDate";
import HeaderDateContainer from "./HeaderDateContainer/HeaderDateContainer";
import MonthsList from "./MonthsList/MonthsList";
import BalanceContainer from "./BalanceContainer/BalanceContainer";
import Graph from "./Graph/Graph";
import AllExpensesContainer from "./AllExpensesContainer/AllExpensesContainer";
import CategoriesDropDownByFilter
  from "./CategoriesDropDownByFilter/CategoriesDropDownByFilter";
import ModalToAdd from "./ModalToAdd/ModalToAdd";
import {styles} from "./stylesHome";

let timeout: number = 0

const Home = ({navigation}: NativeStackNavigatorProps) => {
  const [isModalAddExpense, setIsModalAddExpense] = useState(false)
  const [isSpent, setIsSpent] = useState(true)
  const [valueTitle, setValueTitle] = useState("")
  const [valuePrice, setValuePrice] = useState("")
  const [completeMessage, setCompleteMessage] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [modifiableItem, setModifiableItem] = useState<IExpense>()
  const [openGraph, setOpenGraph] = useState(false)
  const [value, setValue] = useState(0);

  const allExpenses = useSelector((state: RootState) => state.expenses.allExpenses)
  const currentDateString = useSelector((state: RootState) => state.expenses.currentDate)
  const currentDate = new Date(currentDateString)
  const isShowCalendar = useSelector((state: RootState) => state.expenses.isShowCalendar)
  const valueCategories = useSelector((state: RootState) => state.expenses.currentCategories)

  const dispatch = useDispatch()

  const editExpense = async (item: IExpense) => {
    buttonHandler()
    setIsEdit(true)
    setValueTitle(item.title)
    setValuePrice(item.price.toString())
    setValue(item.categoryId)
    setIsSpent(item.isSpent)
    setModifiableItem(item)
  }

  const setOpenGraphFunc = () => {
    setOpenGraph(prevState => !prevState)
  }

  const buttonHandler = () => {
    setIsModalAddExpense(prevState => !prevState)
    setIsEdit(false)
    clearForm()
  }

  const clearForm = () => {
    setValuePrice("")
    setValueTitle("")
    setValue(0)
    setIsSpent(true)
  }

  const addExpense = async () => {
    if (!validationForm()) return
    setIsEdit(false)
    const backup = [...allExpenses]
    try {
      setIsModalAddExpense(false)
      const date = new Date().getTime()
      const newExpense = [valueTitle.trim(), valuePrice, isSpent, date, value]
      let id = 0
      allExpenses.forEach(el => {
        id = Math.max(id, el.id)
      })
      const expense = {
        title: valueTitle.trim(),
        price: +valuePrice,
        isSpent: isSpent,
        date: new Date(),
        categoryId: value,
        id: id + 1
      }
      dispatch(addExpenseAction({expense}))
      await addExpenseRequest(newExpense)
      clearForm()
      successMessage("Транзакция добавлена")
    } catch (err) {
      dispatch(saveAllExpenses({backup}))
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
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
      showToastr("Введите текст!")
      setIsModalAddExpense(false)
      return false
    }
    if (!valuePrice) {
      showToastr("Введите сумму трнзакции!")
      setIsModalAddExpense(false)
      return false
    }
    if (+valuePrice <= 0) {
      showToastr("Введите положительное значение!")
      setIsModalAddExpense(false)
      return false
    }
    return true
  }

  const successMessage = (message: string) => {
    setCompleteMessage(message)
    clearTimeout(timeout)
    timeout = setTimeout(() => setCompleteMessage(""), 2000)
  }

  const showToastr = (message: string) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  const setSpentTrue = () => {
    setIsSpent(true)
  }
  const setSpentFalse = () => {
    setIsSpent(false)
  }
  const setValueTitleFunc = (text: string) => {
    setValueTitle(text)
  }
  const setValuePriceFunc = (text: string) => {
    setValuePrice(text)
  }
  const route = useRoute()

  const memoExpenses: IExpense[] = useMemo(() =>
      sortExpensesByDate([...allExpenses])
    , [allExpenses])

  const filterExpensesByDate = getFilterExpensesByDate([...memoExpenses], currentDate)

  return (
    <View style={styles.container}>
      <HeaderDateContainer/>
      {isShowCalendar && <MonthsList/>}
      {!isShowCalendar && <BalanceContainer
          memoExpenses={memoExpenses}
          setOpenGraphFunc={setOpenGraphFunc}
          openGraph={openGraph}
      />}
      {openGraph && <Graph filterExpensesByDate={filterExpensesByDate}/>}
      <CategoriesDropDownByFilter/>
      {allExpenses.length !== 0
        ? <AllExpensesContainer
          filterExpensesByDate={filterExpensesByDate}
          valueCategories={valueCategories}
          editExpense={editExpense}
        />
        : <Text style={styles.shadowText}>Добавьте транзакцию</Text>
      }
      {isModalAddExpense &&
          <ModalToAdd
              setSpentTrue={setSpentTrue}
              isSpent={isSpent}
              setSpentFalse={setSpentFalse}
              setValueTitleFunc={setValueTitleFunc}
              valueTitle={valueTitle}
              valuePrice={valuePrice}
              setValuePriceFunc={setValuePriceFunc}
              isEdit={isEdit}
              saveEditExpense={saveEditExpense}
              addExpense={addExpense}
              value={value}
              setValue={setValue}
          />
      }
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

export default Home;