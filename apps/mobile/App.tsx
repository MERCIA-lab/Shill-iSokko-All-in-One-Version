import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { RootTabs } from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootTabs />
    </NavigationContainer>
  );
}
