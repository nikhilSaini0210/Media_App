import React, { useEffect, useState } from 'react';
import { Route } from './Routes';
import {
    StackNavigationProp,
    createStackNavigator,
} from '@react-navigation/stack';
import WelcomeScreen, {
    WelcomeScreenParams,
} from '../Screens/WelcomeScreen';
import HomeScreen, { HomeScreenParams } from '../Screens/HomeScreen';

export type MainParams = {};

export type MainNavigatorParams = {
    [Route.WELCOME_SCREEN]: WelcomeScreenParams;
    [Route.HOME_SCREEN]: HomeScreenParams;
};

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const Stack = createStackNavigator();


export interface WelcomeScreenProps {
    navigation: StackNavigationProp<MainNavigatorParams, Route.WELCOME_SCREEN>;
}

export interface HomeScreenProps {
    navigation: StackNavigationProp<MainNavigatorParams, Route.HOME_SCREEN>;
}


const MainNavigator = (props: Partial<StackNavigatorProps>) => {

    return (
        <Stack.Navigator
            initialRouteName={
                Route.WELCOME_SCREEN
            }
            detachInactiveScreens={true}
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false,
                detachPreviousScreen: true,
            }}>
            <Stack.Screen
                name={Route.WELCOME_SCREEN}
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Route.HOME_SCREEN}
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;