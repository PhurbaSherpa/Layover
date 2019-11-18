import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import Splash from "../components/Splash";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SettingsScreen from "../screens/SettingsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import ConnectScreen from "../screens/ConnectScreen";
import GlobalChatScreen from "../screens/GlobalChatScreen";
import Icon from "../components/Icon";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: () => <Icon name="home" size={30} />
};

HomeStack.path = "";

const ConnectStack = createStackNavigator(
  {
    Connect: ConnectScreen
  },
  config
);

ConnectStack.navigationOptions = {
  tabBarLabel: "Connect",
  tabBarIcon: () => <Icon name="link" size={30} />
};

ConnectStack.path = "";

const GlobalStack = createStackNavigator(
  {
    Global: GlobalChatScreen
  },
  config
);

GlobalStack.navigationOptions = {
  header: "Chat",
  tabBarLabel: "Global",
  tabBarIcon: () => <Icon name="user" size={30} />
};

GlobalStack.path = "";

const GroupsStack = createStackNavigator(
  {
    Groups: GroupsScreen
  },
  config
);

GroupsStack.navigationOptions = {
  tabBarLabel: "Groups",
  tabBarIcon: () => <Icon name="user" size={30} />
};

GroupsStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: () => <Icon name="gears" size={30} />
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  GroupsStack,
  GlobalStack,
  ConnectStack,
  SettingsStack
});

export const RootNavigator = createStackNavigator({
  Splash: Splash,
  SignUp: SignupScreen,
  Login: LoginScreen
});

tabNavigator.path = "";
RootNavigator.path = "";

export default tabNavigator;
