import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

//ignore console.logs
LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            //headerTitle: "Bank App",
            //headerLeft: () => <></>,
            headerShown: false,
          }}
        />

        <Stack.Screen name="not-found" options={{}} />
      </Stack>
    </>
  );
}
