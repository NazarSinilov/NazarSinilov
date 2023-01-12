import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GoogleSignIn from "../screens/GoogleSignIn/GoogleSignIn";
import Home from "../screens/Home/Home";
import Error from "../screens/Error/Error";
import ProfileInfo from "../screens/ProfileInfo/ProfileInfo";
import Profile from "../screens/Profile/Profile";
import {RootStackParamList} from "./RootStackParamList";
import Categories from "../screens/Categories/Categories";
import Expenses from "../screens/Expenses/Expenses";

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigate = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"GoogleSignIn"}
                    component={GoogleSignIn}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Home"}
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"ProfileInfo"}
                    component={ProfileInfo}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Error"}
                    component={Error}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Categories"}
                    component={Categories}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Expenses"}
                    component={Expenses}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigate;