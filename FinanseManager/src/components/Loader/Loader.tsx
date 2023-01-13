import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import {styles} from "./stylesLoader";

const Loader = () => {
    return (
        <View style={styles.containerLoader}>
            <ActivityIndicator style={styles.loader}/>
            <Text style={styles.loaderText}>Загрузка ...</Text>
        </View>
    )
};

export default Loader;