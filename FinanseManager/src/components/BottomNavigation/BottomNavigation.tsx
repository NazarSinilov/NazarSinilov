import {TouchableOpacity, View} from "react-native";
import HomeActive from "../../../assets/HomeActive.svg";
import UserActive from "../../../assets/UserActive.svg";
import Plus from "../../../assets/Plus.svg";
import Cancel from "../../../assets/Cancel.svg";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/RootStackParamList";
import {styles} from "./stylesBottomNavigation";

interface BottomNavigationProps {
  route: string
  isButton: boolean
  buttonHandler?: () => void
  isAdd?: boolean
}

const BottomNavigation = ({route, isButton, buttonHandler, isAdd}: BottomNavigationProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

  return (
    <View style={styles.block}>
      <TouchableOpacity onPress={() => route !== "Home" && navigation.navigate("Home")} style={styles.SvgBlock}>
        <HomeActive style={route === "Home" ? styles.sizeSVG : [styles.sizeSVG, styles.svgDisable]}/>
      </TouchableOpacity>

      {isAdd
        ? <TouchableOpacity
          onPress={buttonHandler}
          disabled={!isButton}
          style={isButton ? [styles.buttonRed] : [styles.buttonRed, {opacity: 0}]}
        >
          <Cancel style={styles.sizeSVG}/>
        </TouchableOpacity>
        : <TouchableOpacity
          onPress={buttonHandler}
          disabled={!isButton}
          style={isButton ? [styles.button] : [styles.button, {opacity: 0}]}
        >
          <Plus style={styles.sizeSVG}/>
        </TouchableOpacity>}

      <TouchableOpacity onPress={() => route !== "Profile" && navigation.navigate("Profile")} style={styles.SvgBlock}>
        <UserActive style={route == "Profile" ? styles.sizeSVG : [styles.sizeSVG, styles.svgDisable]}/>
      </TouchableOpacity>

    </View>
  );
};

export default BottomNavigation;