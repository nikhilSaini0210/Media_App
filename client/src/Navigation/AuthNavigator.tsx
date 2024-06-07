import React, {useEffect, useState} from 'react';
import {Route} from './Routes';
import RegisterScreen, {
  RegisterScreenParams,
} from '../Screens/RegisterScreen';
import LoginScreen, {
  LoginScreenParams,
} from '../Screens/LoginScreen';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import MainNavigator, { MainParams} from './MainNavigator';
import ForgetPasswordScreen, { ForgetPasswordScreenParams } from '../Screens/ForgetPasswordScreen';

export type AuthNavigatorParams = {
  [Route.REGISTER_SCREEN]: RegisterScreenParams;
  [Route.LOGIN_SCREEN]: LoginScreenParams;
  [Route.FORGET_PASSWORD_SCREEN]: ForgetPasswordScreenParams;
  [Route.MAIN_NAVIGATOR]: MainParams;
};

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const Stack = createStackNavigator();


export interface RegisterScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, Route.REGISTER_SCREEN>;
}

export interface LoginScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, Route.LOGIN_SCREEN>;
}

export interface ForgetPasswordScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, Route.FORGET_PASSWORD_SCREEN>;
}

const AuthNavigator = (props: Partial<StackNavigatorProps>) => {

  return (
    <Stack.Navigator
      initialRouteName={
         Route.LOGIN_SCREEN
      }
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: false,
        detachPreviousScreen: true,
      }}>
      <Stack.Screen
        name={Route.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
         name={Route.FORGET_PASSWORD_SCREEN}
         component={ForgetPasswordScreen}
         options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.MAIN_NAVIGATOR}
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;