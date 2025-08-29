import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button, View } from "react-native";
import { RootStackParamList } from "../../App";

const SplashScreen = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go Home" onPress={() => navigator.navigate("Home")} />
    </View>
  );
};

export default SplashScreen;
