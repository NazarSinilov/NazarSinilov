import React from 'react';
import {Modal, View, Text, Pressable} from "react-native";
import {styles} from "./ModalDialog.style";
import {ITodo} from "../../../interface/interface";

interface ModalDialogProps {
    closeDialog: () => void
    deleteTask: (getItem: ITodo) => void
    getItem: ITodo | null
}


const ModalDialog = (props : ModalDialogProps) => {

    const {closeDialog, deleteTask, getItem} = props

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalWindow}>
                    <Text style={styles.modalText}>Удалить задачу?</Text>
                    <View style={styles.buttonBlock}>

                        <Pressable onPress={() => closeDialog()} style={[styles.modalButton, styles.buttonNo]}>
                            <Text style={styles.buttonText}>Нет</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => getItem ? deleteTask(getItem) : "" }
                            style={[styles.modalButton, styles.buttonYes]}
                        >
                            <Text style={styles.buttonText}>Да</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );

};


export default ModalDialog;