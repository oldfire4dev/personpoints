import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler
} from 'react-native';

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
    
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <View>
                <Text>Dashboard</Text>
            </View>
        );
    }
}