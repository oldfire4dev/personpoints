import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../views/Main';


const Stack = createStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Main"
                component={Main}
                options={{
                    headerTransparent: true,
                    headerTitle: false,
                }}
            />
        </Stack.Navigator>
    );
}