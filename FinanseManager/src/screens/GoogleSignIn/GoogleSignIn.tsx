import { Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from "react";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {styles} from "./stylesGoogleSignIn";

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
                style={styles.buttonLogin}
                onPress={() => onGoogleButtonPress()}
            >
                <Text style={styles.loginText}>Войти с помощью гугл аккаунта</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GoogleSignIn;