import {Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import React, {useCallback, useState} from "react";
import {colors} from "../../constans/colors";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import ArrowRight from "../../../assets/ArrowRight.svg"
import Bell from "../../../assets/Bell.svg"
import Star from "../../../assets/Star.svg"
import Category from "../../../assets/category.svg"
import Bitmap from "../../../assets/Bitmap.svg"
import Triangle from "../../../assets/Triangle.svg"
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import {getNotificationTime, toggleIsNotification, toggleIsRest} from "../../Redux/userConfigSlice";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {getTime} from "../../utils/getTime";



const Profile = ({navigation}: NativeStackNavigatorProps) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    const dispatch = useDispatch()
    const config = useSelector((state: RootState) => state.config.config)
    const {isNotification, isRest, notificationTime, synchronizationTime} = config

    const onChange = (selectedDate: any) => {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp)

        dispatch(getNotificationTime({currentDate}))
    };

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: new Date(notificationTime),
            onChange,
            mode: "time",
            is24Hour: true,
        });
    };

    const time = getTime(new Date(notificationTime))

    const toggleSwitchNotification = () => {
        dispatch(toggleIsNotification(!isNotification))
    }

    const toggleSwitchRest = () => {
        dispatch(toggleIsRest(!isRest))
    }

    function onAuthStateChanged(user: any) {
        if (initializing) setInitializing(false);
        setUser(user)
    }

    useFocusEffect(useCallback(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return () => subscriber
    }, [user]))


    const route = useRoute()
    return (
        <>
            <ScrollView style={styles.container}>

                <TouchableOpacity onPress={() => navigation.navigate("ProfileInfo")} style={styles.profileBlock}>
                    <Image style={styles.profile_ava}
                           source={user
                               ? {uri: user?.photoURL}
                               : require("../../../assets/default_ava.jpg")}
                    />
                    <View style={styles.userData}>
                        <Text style={styles.userName}>{user?.displayName}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                    <ArrowRight/>
                </TouchableOpacity>

                <View style={styles.notificationBlock}>

                    <View style={styles.enableNotificationBlock}>
                        <View style={styles.bellBackground}>
                            <Bell/>
                        </View>
                        <Text style={styles.notificationTitle}>Напоминать ежедневно</Text>
                        <Switch
                            trackColor={{false: "#767577", true: "#3DD598"}}
                            thumbColor={isNotification ? "#3DD598" : "#767577"}
                            onValueChange={toggleSwitchNotification}
                            value={isNotification}
                        />
                    </View>

                    <View style={styles.border}/>
                    <View style={config.isNotification ? styles.timeBlock : [styles.timeBlock, styles.disableTime]}>
                        <Text style={styles.timeText}>Время напоминания </Text>
                        <View style={styles.backgroundInput}>
                            <Text onPress={() => config.isNotification && showMode() } style={styles.inputTime}>
                                {time}
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={styles.restBlock}>
                    <View style={styles.starBackground}>
                        <Star/>
                    </View>
                    <Text style={styles.restText}>Расчитывать остаток на конец месяца</Text>
                    <View>
                        <Switch
                            trackColor={{false: "#767577", true: "#3DD598"}}
                            thumbColor={isRest ? "#3DD598" : "#767577"}
                            onValueChange={toggleSwitchRest}
                            value={isRest}
                        />
                    </View>
                </View>




                <TouchableOpacity onPress={()=> navigation.navigate("Categories")} style={styles.categoryBlock}>
                    <Category width={20} height={20}/>
                    <Text style={styles.categoryText}>Мои категории</Text>
                    <ArrowRight/>
                </TouchableOpacity>




                <View style={styles.synchronizationBlock}>
                    <View style={styles.synchBackgroundImage}>
                        <Bitmap width={31} height={31}/>
                    </View>
                    <View style={styles.synchTextBlock}>
                        <Text style={styles.synchTitle}>Синхронизация</Text>
                        <Text style={styles.synchSubtitle}>Последняя 8 PM </Text>
                    </View>
                    <TouchableOpacity style={styles.synchButton}>
                        <Triangle/>
                    </TouchableOpacity>
                </View>



            </ScrollView>
            <BottomNavigation
                route={route.name}
                isButton={false}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    profileBlock: {
        flexDirection: "row",
        backgroundColor: colors.BACKGROUND_DATA,
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
        borderTopColor: "#5c6b6f",
        borderTopWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 16,
        alignItems: "center",
        marginBottom: 26
    },
    profile_ava: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 17
    },
    userData: {
        flex: 1,
    },
    userName: {
        fontStyle: "italic",
        fontSize: 16,
        marginBottom: 4,
        color: "white"
    },
    userEmail: {
        fontSize: 14,
        color: "white"

    },
    notificationBlock: {
        backgroundColor: colors.BACKGROUND_DATA,
        marginBottom: 25
    },
    enableNotificationBlock: {
        paddingVertical: 20,
        paddingHorizontal: 18,

        flexDirection: "row",
        alignItems: "center"
    },
    bellBackground: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        marginRight: 16
    },
    notificationTitle: {
        color: "white",
        fontSize: 18,
        flex: 1
    },
    border: {
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
    },
    timeBlock: {
        paddingHorizontal: 18,
        paddingTop: 5,
        paddingBottom: 23,
    },
    disableTime: {
         opacity: 0.5
    },
    timeText: {
        color: "white",
        fontSize: 18,

    },
    backgroundInput: {
        backgroundColor: "#2A3C44",
        width: "100%",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 9,
        paddingVertical: 11
    },
    inputTime: {
        color: "white",
        fontSize: 20,

    },
    restBlock: {
        backgroundColor: colors.BACKGROUND_DATA,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22
    },
    starBackground: {
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: "#FFC542",
        marginRight: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    restText: {
        color: "white",
        fontSize: 18,
        lineHeight: 26,
        width: "70%",
        flex: 1
    },
    categoryBlock: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.BACKGROUND_DATA,
        padding: 15,
        borderBottomColor: "#5c6b6f",
        borderBottomWidth: 1,
        borderTopColor: "#5c6b6f",
        borderTopWidth: 1,
    },
    categoryText: {
        color: "white",
        fontSize: 20,
        marginLeft: 20,
        fontStyle: "italic",
        flex: 1
    },
    synchronizationBlock: {
        marginHorizontal: 24,
        flex: 1,
        height: 100,
        backgroundColor: "#286053",
        borderRadius: 25,
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    synchBackgroundImage: {
        backgroundColor: colors.LIGHT_GREEN,
        width: 58,
        height: 58,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 18
    },
    synchTextBlock: {
        flex: 1
    },
    synchTitle: {
        color: colors.LIGHT_GREEN,
        fontSize: 14,
        lineHeight: 23
    },
    synchSubtitle: {
        color: "#3DD59880",
        fontSize: 14,
        lineHeight: 23
    },
    synchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#3DD59880",
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.LIGHT_GREEN,
        borderWidth: 2
    }
})

export default Profile;