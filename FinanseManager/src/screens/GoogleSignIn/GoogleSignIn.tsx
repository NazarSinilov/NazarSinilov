import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {colors} from "../../constans/colors";
import {useEffect, useState} from "react";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";


GoogleSignin.configure({
    webClientId: '647788286035-obajgtrtdpmlesn3oicd3bv7abs3g4u8.apps.googleusercontent.com',
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.readonly"]
});



function GoogleSignIn({navigation} : NativeStackNavigatorProps) {
    const [isSignedIn, setIsSignedIn ] = useState(false)

    useEffect(() => {
        const isSignedIn = async () => {
            const isSignedIn = await GoogleSignin.isSignedIn();
            setIsSignedIn(!isSignedIn);
            if (isSignedIn) {
                navigation.replace("Home")
            }
        };
        isSignedIn()
    }, [isSignedIn])



    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn()
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            await auth().signInWithCredential(googleCredential);
            navigation.navigate("Home")
        } catch (error) {
            if (error instanceof Error) {
                navigation.navigate("Error" , {errorMessage: error.message})
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>Вход</Text>

            <TouchableOpacity
                style={styles.ButtonLogin}
                onPress={() => onGoogleButtonPress()}
            >
                <Text style={styles.loginText}>Войти с помощью гугл аккаунта</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GoogleSignIn;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        backgroundColor: colors.BACKGROUND
    },
    ButtonLogin: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 58,
        backgroundColor: "#40DF9F",
        borderRadius: 12,
        marginTop: 45

    },
    loginText: {
        fontStyle: "italic",
        fontSize: 16,
        color: "black"
    },
    loginTitle: {
        fontSize: 34,
        fontWeight: "700",
        color: "white"
    }
})

