import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../../styles';

// ----- SERVICES
import UserService from '../../services/users/user_service';

const user_service = new UserService();

export default function VerifyAuthenticate({ navigation }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        verifyAuth();
    })

    async function verifyAuth() {
        if(user_service.isAuthUser()) {
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
        redirectUser(isAuthenticated);
    }

    function redirectUser(auth) {
        navigation.navigate( auth ? 'Dashboard' : 'Main' );
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
}