import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigator = useNavigation<HomeNavigationProps>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go To Splash" onPress={() => navigator.goBack()} />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Go To Profile"
        onPress={() =>
          navigator.navigate("Profile", { userId: 1, name: "Ami" })
        }
      />
    </View>
  );
};

export default HomeScreen;
