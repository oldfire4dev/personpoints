import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
     TouchableOpacity
} from 'react-native';

import DashboardStyles from './../../styles/Dashboard';

import Loading from '../../components/Loading';
import UserService from '../../services/users/user_service';

const user_service = new UserService();
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    backAction = () => {
        Alert.alert("Sair", "Deseja realmente sair do aplicativo?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    
    logoutUser = () => {
        user_service.logoutUser()
        this.props.navigation.navigate('Main');
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <View style={DashboardStyles.app}>
                <View style={DashboardStyles.teste}>
                    <Text>Dashboard</Text>
                </View>
                <TouchableOpacity onPress={() => this.logoutUser()}>
                    <Text>Sair</Text>
                </TouchableOpacity>
            </View>
        );
    }
}