import {Text, TouchableOpacity, View} from "react-native";
import Bitmap from "../../../../../assets/Bitmap.svg";
import {getTime} from "../../../../utils/getTime";
import Triangle from "../../../../../assets/Triangle.svg";
import React from "react";
import {styles} from "./stylesSynchronization";

interface SynchronizationProps {
    setSynchTime: () => void
    synchronizationTime: Date
}

const Synchronization = ({setSynchTime, synchronizationTime} : SynchronizationProps) => {
    return (
        <View style={styles.synchronizationBlock}>
            <View style={styles.synchBackgroundImage}>
                <Bitmap width={31} height={31}/>
            </View>
            <View style={styles.synchTextBlock}>
                <Text style={styles.synchTitle}>Синхронизация</Text>
                <Text style={styles.synchSubtitle}>Последняя {getTime(new Date(synchronizationTime))} </Text>
            </View>
            <TouchableOpacity onPress={setSynchTime} style={styles.synchButton}>
                <Triangle/>
            </TouchableOpacity>
        </View>
    );
};

export default Synchronization;