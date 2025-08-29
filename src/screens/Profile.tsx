import { useNavigation, NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type ProfileNavigationProps = RouteProp<RootStackParamList, "Profile">;
type Props = {
    route: ProfileNavigationProps;
};

const ProfileScreen = ({ route }: Props) => {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Go Home" onPress={() => navigator.navigate("Home")} />
            <Text>User ID: {route.params.userId}</Text>
            <Text>Name: {route.params.name}</Text>
        </View>
    );
};

export default ProfileScreen;
