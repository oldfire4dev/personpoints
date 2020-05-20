import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    StatusBar,
    BackHandler,
    Alert,
    ToastAndroid
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../styles/index';
import MainStyles from '../../styles/Main';

import logo from './../../assets/logo.png';
import background from './../../assets/background.png';
import Login from '../Login';
import SignUp from '../SignUp';

let backHandlerClickCount = 0;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFormModal: false,
            button: null,
            formComponent: null
        }
    }

    showFormModal = (show, button) => {
        this.setState({
            showFormModal: show,
            button,
            formComponent: button==1 ? <Login /> : <SignUp />
        });
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
            <View style={MainStyles.containerStart}>
                <StatusBar barStyle='light-content' backgroundColor='#203f78' />
                <Image style={MainStyles.background} source={background} />
                <View>
                    <View>
                        <Image style={MainStyles.logo} source={logo}  />
                    </View>
                    <View>
                        <Text style={MainStyles.sloganText}>Planeje. Conquiste. Evolua.</Text>
                    </View>
                </View>
                <View style={MainStyles.btnArea}>
                    <Button buttonStyle={MainStyles.loginBtn} titleStyle={MainStyles.loginBtnText} title="Entrar" onPress={() => {this.showFormModal(true, 1)}} />
                    <View style={MainStyles.signUpArea}>
                        <Text style={MainStyles.signUpAsk}>Ainda não tem uma conta? </Text>
                        <TouchableOpacity style={MainStyles.signUpBtn} onPress={() => {this.showFormModal(true, 2)}}>
                            <Text style={MainStyles.signUpText}>cadastrar agora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.showFormModal}
                        onRequestClose={() => this.showFormModal(false) }
                        style={MainStyles.modalContainer}
                    >
                        <SafeAreaView style={MainStyles.loginContainer}>
                            {this.state.formComponent}
                        </SafeAreaView>
                    </Modal>
                </View>
            </View>
        );
    }
}