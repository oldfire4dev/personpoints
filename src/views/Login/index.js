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
import PPAPI from '../../configs/api/axios_config';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/index';
import LoginStyles from '../../styles/Login';


export default function Login() {
    const { appWidth, appHeight } = Dimensions.get('window');
    const navigation = useNavigation();
    const [email, setEmail] = useState('teste@example.com');
    const [password, setPassword] = useState(null);
    const [showPass, setShowPass] = useState(false);

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

    function loginUser() {
        if(email === 'teste@example.com' || !password){
            console.log('Os campos não podem ficar vazios');
        } else {
            const user = { email, password };
            PPAPI.post('/api/login', user);
        }
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
                {/* <View style={LoginStyles.closeBtnArea}>
                    <TouchableOpacity style={LoginStyles.closeBtn} onPress={() => navigation.navigate('Main')}>
                        <Icon name="times" size={28} style={LoginStyles.closeIcon} />
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}