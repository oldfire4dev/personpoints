import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../views/Main';
import Dashboard from '../views/Dashboard';
import VerifyAuthenticate from '../views/VerifyAuthenticate';

import { decode, encode } from 'base-64';
import ignoreWarnings from 'react-native-ignore-warnings';

const Stack = createStackNavigator();
ignoreWarnings('Setting a timer');

// solving the missing 'atob' variable
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="VerifyAuthenticate"
                component={VerifyAuthenticate}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                }}
            />
            <Stack.Screen 
                name="Main"
                component={Main}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                }}
            />
        </Stack.Navigator>
    );
}