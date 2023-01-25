import {Text, View} from "react-native";
import {styles} from "./stylesUserInfo";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";

interface UserInfoProps {
  user: FirebaseAuthTypes.User
}

const UserInfo = ({user}: UserInfoProps) => {

  return (
    <View>
      <View style={styles.userBlock}>
        <Text style={styles.userTitle}>Ваше имя</Text>
        <View style={[styles.backgroundName, styles.backgroundUserInfo]}>
          <Text style={styles.userName}>{user?.displayName}</Text>
        </View>
      </View>

      <View style={styles.userBlock}>
        <Text style={styles.userTitle}>Ваш email</Text>
        <View style={[styles.backgroundEmail, styles.backgroundUserInfo]}>
          <Text>{user?.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;