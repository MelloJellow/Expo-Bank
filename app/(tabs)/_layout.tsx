import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Bank App",
          //headerLeft: () => <></>, //locks backpage (decent for 404 handle)
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          headerTitle: "Chart",
          tabBarIcon: ({ focused, color }) => (
            <EvilIcons
              name={focused ? "chart" : "chart"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chqocr"
        options={{
          headerTitle: "Cheque Scanner",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name={focused ? "scan" : "scan"}
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="help"
        options={{
          headerTitle: "Help",
          tabBarIcon: ({ focused, color }) => (
            <Entypo name={focused ? "help" : "help"} color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
}
