import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-community/async-storage';

// ----- SERVICES
import UserService from '../../services/users/user_service';
import Loading from '../../components/Loading';

const user_service = new UserService();

export default function VerifyAuthenticate({ navigation }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        verifyAuth();
    })

    async function verifyAuth() {
        let auth_user = await AsyncStorage.getItem('auth_user');
        let user = JSON.parse(auth_user);
        if(user) {
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
        redirectUser(isAuthenticated, user);
    }

    function redirectUser(auth, user) {
        if(auth) navigation.navigate('UserVerified', user)
        else navigation.navigate('Main' );
    }

    return (
        <View style={styles.container}>
            <Loading color="#203f78" />
        </View>
    );
}