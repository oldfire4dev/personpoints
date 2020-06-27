import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-community/async-storage';

// ----- SERVICES
import UserService from '../../services/users/user_service';
import UserController from '../../controllers/user/user_controller';
import Loading from '../../components/Loading';

const user_service = new UserService();
const user_controller = new UserController();

export default function VerifyAuthenticate({ navigation }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(null);

    useEffect(() => {
        verifyAuth();
    })

    async function isVerifiedAcc(){
        let isVerified = await user_service.isVerifiedEmail();
        setIsVerifiedEmail(isVerified);
    }

    async function verifyAuth() {
        let auth_user = await AsyncStorage.getItem('auth_user');
        let user = JSON.parse(auth_user);
        // user_service.logoutUser()
        // console.log(isVerifiedEmail)
        if(user || user_service.isAuthUser()) {
            !user_service.isAuthUser() && user_controller.login(user)
            .then(() => {
                redirectUser(true);
            })
        }else{
            redirectUser(false);
        }
    }

    function redirectUser(auth) {
        if(auth) navigation.navigate('UserVerified');
        else navigation.navigate('Main');
    }

    return (
        <View style={styles.container}>
            <Loading color="#203f78" />
        </View>
    );
}