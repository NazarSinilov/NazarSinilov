import {
    StatusBar,
    FlatList,
    View,
    ActivityIndicator,
    Text,
    RefreshControl,
    Image, Pressable, SafeAreaView, ToastAndroid
} from 'react-native';
import React, {useEffect, useMemo, useState} from "react";
import CardTodo from "./CardTodo/CardTodo";
import ModalWindow from "./ModalWindow/ModalWindow";
import {deleteRequest, getRequest, postRequest, putRequest} from "../../api/API";
import {sortArray} from "../../utils/sortTasks";
import ModalDialog from "./ModalDialog/ModalDialog";
import AlertMessage from "./AlertMessage/AlertMessage";
import {styles} from "./TodoList.style";
import {ITodo} from "../../interface/interface";

let timeout: number = 0

export default function TodoList() {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [isLoader, setIsLoader] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [completeMessage, setCompleteMessage] = useState("")
    const [dialogVisible, setDialogVisible] = useState(false)
    const [getItem, setGetItem] = useState<ITodo | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setIsLoader(true)
            const res : ITodo[] = await getRequest()
            setTodos(res)
        } catch (err) {
            setError(true)
        } finally {
            setIsLoader(false)
        }
    }

    const addTask = async (inputValue: string) => {
        const trimValue = inputValue.trim()
        if (!trimValue) {
            showToastr()
        }

        hideModal()
        const backUp : ITodo[] = [...todos]

        try {
            const res: ITodo = await postRequest(trimValue)

            const newTodos : ITodo[] = [...todos]
            newTodos.push(res)
            setTodos(newTodos)
            successMessage("ЗАПИСЬ ДОБАВЛЕНА")
        } catch (err) {
            setError(true)
            setTodos(backUp)
        }
    }

    const getEditTaskItem = (item: ITodo) => {
        showModal()
        setGetItem(item)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    const showModal = () => {
        setModalVisible(true)
    }

    const deleteTask = async (item: ITodo) => {
        const backUp : ITodo[] = [...todos]
        try {
            setTodos(todos.filter(el => item._id !== el._id))
            await deleteRequest(item)
            successMessage("ЗАПИСЬ УДАЛЕНА")
            setGetItem(null)
            setDialogVisible(false)
        } catch (err) {
            setError(true)
            setTodos(backUp)
        }
    }

    const successMessage = (message: string) => {
        setCompleteMessage(message)
        clearTimeout(timeout)
        timeout = setTimeout(() => setCompleteMessage(""), 2000)
    }

    const changeTask = async (item: ITodo) => {
        const backUp : ITodo[] = [...todos]
        hideModal()
        setGetItem(null)
        try {
            const newArray : ITodo[] = [...todos].map((i) => i._id === item._id ? item : i)
            setTodos(newArray)
            return await putRequest(item)
        } catch (err) {
            setError(true)
            setTodos(backUp)
        }
    }

    const toggleSwitch = (item: ITodo) => {
        const newItem : ITodo = {...item}
        newItem.isCheck = !newItem.isCheck
        changeTask(newItem)

    }

    const editTask = (getItem: ITodo, inputValue: string) => {
        const trimmedInput =  inputValue.trim()
        if (getItem && trimmedInput) {
            const newItem : ITodo = {...getItem, text: trimmedInput}
            changeTask(newItem)
            successMessage("ЗАДАЧА ИЗМЕНЕНА")
        }
        if (!trimmedInput) {
            showToastr()
        }
    }

    const showToastr = () => {
        ToastAndroid.showWithGravity("Введите текст!", ToastAndroid.SHORT, ToastAndroid.TOP);
    }

    const closeDialog = () => {
        setDialogVisible(false)
        setGetItem(null)
    }

    const showDialog = (item: ITodo) => {
        setDialogVisible(true)
        setGetItem(item)
    }

    const closeAlertError = () => {
        setError(false)
    }

    const memoTodo: ITodo[] = useMemo(() => sortArray(todos), [todos])

    if (isLoader) {
        return (
            <View style={styles.containerLoader}>
                <ActivityIndicator style={styles.loader}/>
                <Text style={styles.loaderText}>Загрузка ...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true}/>
            <FlatList
                style={styles.todoList}
                refreshControl={<RefreshControl refreshing={isLoader} onRefresh={fetchTodos}/>}
                data={memoTodo}
                renderItem={({item}) =>
                    <CardTodo
                        item={item}
                        getEditTaskItem={getEditTaskItem}
                        toggleSwitch={toggleSwitch}
                        showDialog={showDialog}
                    />}
            />

            {dialogVisible && <ModalDialog
                closeDialog={closeDialog}
                deleteTask={deleteTask}
                getItem={getItem}
            />}

            {modalVisible && <ModalWindow
                getItem={getItem}
                editTask={editTask}
                addTask={addTask}
            />}

            {error &&  <AlertMessage closeAlertError={closeAlertError}/>}

            {completeMessage && <View style={styles.modal}>
                <View style={styles.alertComplete}>
                    <Text style={styles.alertCompleteText}>{completeMessage}</Text>
                </View>
            </View>}

            <View style={styles.footer}>
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible)
                        setGetItem(null)
                    }}
                    style={modalVisible ? [styles.footerCancel, styles.footerIcon] : [styles.footerAdd, styles.footerIcon]}
                >
                    <Image
                        style={styles.footerIconAdd}
                        source={modalVisible ? require("../../../assets/cancel.png") : require("../../../assets/plus.png")}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
