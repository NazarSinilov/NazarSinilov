import React from 'react';
import {Modal, View, Text, Image, Pressable} from "react-native";
import {styles} from "./AlertMessage.style";

interface AlertMessageProps {
    closeAlertError: () => void
}

const AlertMessage = ({closeAlertError} : AlertMessageProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
        >
            <View style={styles.alertContainer}>
                <View style={styles.alertWindow}>
                    <View style={styles.topPart}>
                        <View>
                            <Image source={require("../../../../assets/message.png")}/>
                        </View>
                        <Text style={styles.titleText}>Ошибка</Text>
                        <View>
                            <Pressable onPress={() => closeAlertError()}>
                                <Image source={require("../../../../assets/cancelAlert.png")}/>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={styles.errorText}>В данный момент сервер не доступен</Text>
                </View>
            </View>
        </Modal>
    );
};

export default AlertMessage;