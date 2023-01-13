import Category from "../../../../assets/category.svg";
import {Text, TouchableOpacity} from "react-native";
import ArrowRight from "../../../../assets/ArrowRight.svg";
import React from "react";
import {styles} from "./stylesCategoriesLink";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigation/RootStackParamList";

const CategoriesLink = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Categories")} style={styles.categoryBlock}>
            <Category width={20} height={20}/>
            <Text style={styles.categoryText}>Мои категории</Text>
            <ArrowRight/>
        </TouchableOpacity>
    );
};

export default CategoriesLink;