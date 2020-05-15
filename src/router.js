import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './routes/stackNav';


export default function NavContainer() {
  return (
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
  );
}