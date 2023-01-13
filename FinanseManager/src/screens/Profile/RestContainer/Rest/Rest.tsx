import {Switch, Text, View} from "react-native";
import Star from "../../../../../assets/Star.svg";
import React from "react";
import {styles} from "./stylesRest";
import {colors} from "../../../../constans/colors";

interface RestProps {
    toggleSwitchRest: () => void
    isRest: boolean
}

const Rest = ({toggleSwitchRest, isRest} : RestProps) => {

    return (
        <View style={styles.restBlock}>
            <View style={styles.starBackground}>
                <Star/>
            </View>
            <Text style={styles.restText}>Расчитывать остаток на конец месяца</Text>
            <View>
                <Switch
                    trackColor={{false: colors.GRAY, true: colors.LIGHT_GREEN}}
                    thumbColor={isRest ? colors.LIGHT_GREEN : colors.GRAY}
                    onValueChange={toggleSwitchRest}
                    value={isRest}
                />
            </View>
        </View>
    );
};

export default Rest;