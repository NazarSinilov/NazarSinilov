import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GoogleSignIn from "../screens/GoogleSignIn/GoogleSignIn";
import Home from "../screens/Home/Home";
import Error from "../screens/Error/Error";
import ProfileInfo from "../screens/ProfileInfo/ProfileInfo";
import Profile from "../screens/Profile/Profile";
import {RootStackParamList} from "./RootStackParamList";
import Categories from "../screens/Categories/Categories";
import Index from "../screens/Expenses";

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={"GoogleSignIn"}
          component={GoogleSignIn}
        />
        <Stack.Screen
          name={"Home"}
          component={Home}
        />
        <Stack.Screen
          name={"ProfileInfo"}
          component={ProfileInfo}
        />
        <Stack.Screen
          name={"Profile"}
          component={Profile}
        />
        <Stack.Screen
          name={"Error"}
          component={Error}
        />
        <Stack.Screen
          name={"Categories"}
          component={Categories}
        />
        <Stack.Screen
          name={"Expenses"}
          component={Index}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Navigate;