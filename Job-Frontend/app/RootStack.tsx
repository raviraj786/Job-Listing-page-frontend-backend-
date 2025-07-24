import Filterjoblist from '@/src/screens/Filterjoblist';
import FilterjobSrc from "@/src/screens/FilterjobSrc";
import HomeSrc from "@/src/screens/HomeSrc";
import JobDetails from "@/src/screens/JobDetails";
import OnBordingSrc from "@/src/screens/OnBordingSrc";
import SearchPage from "@/src/screens/SearchPage";
import SubscribSrc from "@/src/screens/SubscribSrc";
import ViewjobsSrc from "@/src/screens/ViewjobsSrc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BotamTab from "./BotamTab";

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnBordingSrc"
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="OnBordingSrc" component={OnBordingSrc} />
      <Stack.Screen name="BotamTab" component={BotamTab} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="search" component={SearchPage} />
      <Stack.Screen name="filter" component={FilterjobSrc} />
      <Stack.Screen name="alljobs" component={ViewjobsSrc} />
      <Stack.Screen name="Subscrib" component={SubscribSrc} />
      <Stack.Screen name="Home" component={HomeSrc} />
      <Stack.Screen  name="Filterjoblist" component={Filterjoblist}  />


    </Stack.Navigator>
  );
}

export default RootStack;
