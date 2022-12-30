import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

const Loader = () => {
    return (
        <View style={styles.containerLoader}>
            <ActivityIndicator style={styles.loader}/>
            <Text style={styles.loaderText}>Загрузка ...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#23333a",
    },
    loader: {
        transform: [{scaleX: 4}, {scaleY: 4}],
        marginBottom: 40
    },
    loaderText: {
        color: "#FFFFFF",
        fontSize: 20
    },
})


export default Loader;