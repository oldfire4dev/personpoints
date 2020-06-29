import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import AwesomeAlert from 'react-native-awesome-alerts';

import VerifyAccountStyles from '../../styles/VerifyAccount';
import verify_account_img from '../../assets/verify_account.png';

import UserService from '../../services/users/user_service';
const user_service = new UserService();


export default class VerifyAccount extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            isVerified: null,
            showVerifiedAlert: false,
            verifiedUserAlert: null,
        }
    }

    verifiedButtonHandle = (status) => {
        this.setState({
            showVerifiedAlert: status,
        })
    }

    clickHereHandle = () => {
        user_service.sendEmailVerification()
            .then(() => {
                Toast.show('Link enviado para o email', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
    }

    setNameAndEmail = () => {
        const {email, name, isVerified} = this.props.route.params;
        let firstName = name.split(' ')[0]
        this.setState({ name: firstName, email, isVerified });
    }

    componentDidMount = () => {
        this._isMounted = true
        if(this._isMounted){
            this.setNameAndEmail();
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={VerifyAccountStyles.app} >
                <Text style={VerifyAccountStyles.notVerifiedText}>Conta não verificada</Text>
                <View>
                    <Image style={VerifyAccountStyles.img} source={verify_account_img} />
                </View>
                <View style={VerifyAccountStyles.explainingArea}>
                    <Text style={VerifyAccountStyles.helloText}>Olá, {this.state.name}.</Text>
                    <Text style={VerifyAccountStyles.explainingText}>Nós enviamos um email para você ativar sua conta. Email enviado para: {this.state.email} </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15,}}>
                    <Text style={VerifyAccountStyles.explainingText}>Caso não tenha recebido, </Text>
                    <TouchableOpacity onPress={() => this.clickHereHandle(true) }>
                        <Text style={VerifyAccountStyles.clickHereText}>clique aqui</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button buttonStyle={VerifyAccountStyles.verifiedBtn} title="Já verifiquei" onPress={() => this.verifiedButtonHandle(true)} />
                </View>
                <AwesomeAlert
                    show={this.state.showVerifiedAlert}
                    showProgress={false}
                    title="Hey!!"
                    message="Por favor, feche e abra o aplicativo e você será redirecionado automáticamente para sua conta :)"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok, entendi"
                    confirmButtonColor="#203f78"
                    onConfirmPressed={() => {
                        this.verifiedButtonHandle(false)
                    }}
                />
            </View>
        );
    }
}