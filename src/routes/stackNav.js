import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../views/Main';
import DrawerNav from '../routes/drawerNav';
import VerifyAuthenticate from '../views/VerifyAuthenticate';
import VerifyAccount from '../views/VerifyAccount';

import userVerified from '../views/VerifyAccount/userVerified';

import { decode, encode } from 'base-64';
import ignoreWarnings from 'react-native-ignore-warnings';

const Stack = createStackNavigator();
ignoreWarnings('Setting a timer');

// solving the missing 'atob' variable
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

export default function StackNav() {
    return (
        <Stack.Navigator initialRouteName="VerifyAuthenticate" >
            <Stack.Screen 
                name="VerifyAuthenticate"
                component={VerifyAuthenticate}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                    headerShown: false
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
                name="UserVerified"
                component={userVerified}
                options={{
                    headerTransparent: false,
                    headerTitle: false,
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="VerifyAccount"
                component={VerifyAccount}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="DrawerNav"
                component={DrawerNav}
                options={{
                    headerTransparent: false,
                    headerTitle: false,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}