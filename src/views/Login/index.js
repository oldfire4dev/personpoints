import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    Button,
    Input
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import UserController from '../../controllers/user/user_controller';
import AwesomeAlert from 'react-native-awesome-alerts';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/index';
import LoginStyles from '../../styles/Login';

const user_controller = new UserController();

export default function Login({ closeModalWhenSubmit }) {
    const { appWidth, appHeight } = Dimensions.get('window');
    const navigation = useNavigation();
    const [email, setEmail] = useState('teste@example.com');
    const [password, setPassword] = useState(null);
    const [showPass, setShowPass] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        verifyFormItems();
    })

    function formatEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function verifyFormItems() {
        if( email === 'teste@example.com' || !password  || !formatEmail(email) )
            setDisableButton(true);
        else
            setDisableButton(false);
    }

    function confirmedError() {
        setErrorAlert(false);
    }

    function loginUser() {
        const user = { email, password };
        user_controller.login(user)
            .then(() => {
                navigation.navigate('UserVerified');
                closeModalWhenSubmit();
            })
            .catch((error) => {
                setErrorAlert(true);
                setErrorMsg(error);
            })
    }

    function forgetPassword() {
        console.log('Forget password')
    }

    return (
        <View>
            <View>
                <View>
                    <Text style={LoginStyles.loginTitle}>Login</Text>
                </View>
            </View>
            <View style={LoginStyles.formArea}>
                <View style={LoginStyles.inputEmail}>
                    <Input
                        placeholder='nome@email.com'
                        autoFocus={true}
                        leftIcon={
                            <Icon
                                name='user'
                                size={20}
                                color='#191d24'
                            />
                        }
                        inputStyle={{ paddingLeft: 7, }}
                        selectionColor='#5388d0'
                        keyboardType='email-address'
                        textContentType="emailAddress"
                        returnKeyType = 'next'
                        blurOnSubmit={false}
                        onChangeText={(email) => { setEmail( email ) }}
                        errorMessage={formatEmail(email) ? '' : 'Digite um email válido.'}
                    />
                </View>
                <View style={LoginStyles.inputPassword}>
                    <Input
                        placeholder='senha'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={20}
                                color='#191d24'
                            />
                        }
                        inputStyle={{ paddingLeft: 7, }}
                        selectionColor='#5388d0'
                        keyboardType={!showPass?'default':'visible-password'}
                        secureTextEntry={true}
                        onChangeText={(password) => { setPassword( password ) }}
                        // errorMessage={this.formatPass(this.state.password) ? '' : 'Email inválido'}
                        onSubmitEditing={() => loginUser()}
                    />
                </View>
                <View>
                    <Button buttonStyle={LoginStyles.loginBtn} disabled={disableButton} title="Entrar" onPress={() => loginUser()} />
                </View>
                <View style={LoginStyles.forgotPassArea}>
                    <TouchableOpacity onPress={() => forgetPassword() }>
                        <Text style={LoginStyles.forgotPassText}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={errorAlert}
                    showProgress={false}
                    title="Erro!"
                    message={errorMsg}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Obrigado"
                    confirmButtonColor="#203f78"
                    onConfirmPressed={() => {
                        confirmedError()
                    }}
                    overlayStyle={LoginStyles.alertErrorArea}
                    alertContainerStyle={LoginStyles.teste}
                />
                {/* <View style={LoginStyles.closeBtnArea}>
                    <TouchableOpacity style={LoginStyles.closeBtn} onPress={() => navigation.navigate('Main')}>
                        <Icon name="times" size={28} style={LoginStyles.closeIcon} />
                    </TouchableOpacity>
                </View> */}
            </View>

            <View style={LoginStyles.alertErrorArea}>
                
            </View>

        </View>
    );
}