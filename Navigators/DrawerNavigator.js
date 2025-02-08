import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,

} from "@react-navigation/drawer";
import { View } from "react-native";
import { Drawer } from 'react-native-paper';
import Main from "./Main";

import DrawerContent from "../Screens/Shared/DrawerContent";
import HomeNavigator from "./HomeNavigator";
const NativeDrawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
   
      <NativeDrawer.Navigator
        screenOptions={{
          drawerStyle: {
            width: '50%',
          },
        }}
        
        drawerContent={() => <DrawerContent />}>
        <NativeDrawer.Screen name="My app" component={Main}  />
        
      </NativeDrawer.Navigator>
 

  );
}
export default DrawerNavigator