import React, { Component, useState, useEffect} from 'react';
import { View, ActivityIndicator, StatusBar, Text } from 'react-native';
import styles from '../../styles';

// ----- SERVICES
import UserService from '../../services/users/user_service';
import UserController from '../../controllers/user/user_controller';
import Loading from '../../components/Loading';

const user_service = new UserService();
const user_controller = new UserController();

export default class userVerified extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    isVerifiedUser = async (data) => {
        this.setState({
            user:{
                id: data.userOnDB.id,
                name: data.userOnDB.name,
                email: data.userOnDB.email,
                genre: data.userOnDB.genre,
                profilePic: data.userOnDB.profilePic,
                createdAt: data.userOnDB.createdAt,
                updatedAt: data.userOnDB.updatedAt,
                isVerified: data.user.emailVerified
            }
        })
        setTimeout(() => {
            if(this.state.user.isVerified) this.props.navigation.navigate('DrawerNav', { screen: 'Dashboard', params: {user: this.state.user} });
            else this.props.navigation.navigate('VerifyAccount', this.state.user);
        }, 1700)
    }

    componentDidMount = async () => {
        this._isMounted = true;
        let data = await user_controller.fetchUser();
        if(this._isMounted){
            this.isVerifiedUser(data);
        }
    }

    
    componentWillUnmount = () => {
        this._isMounted = false;
        const abortController = new AbortController();
        abortController.abort();
    }

    render() {
        return (
            <View style={styles.container}>
                <Loading color="#203f78" />
                <Text>Entrando...</Text>
            </View>
        );
    }
}
