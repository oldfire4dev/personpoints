import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    Button,
    Input,
    CheckBox
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import UserService from '../../services/users/userService';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/index';
import LoginStyles from '../../styles/Login';

const user_service = new UserService();

export default function signUp() {
    const { appWidth, appHeight } = Dimensions.get('window');
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState('teste@example.com');
    const [genre, setGenre] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [checkedMasc, setCheckedMasc] = useState(false);
    const [checkedFem, setCheckedFem] = useState(false);

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        verifyFormItems();
        verifyGenre();
    })

    function formatEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function verifyConfirmPassword(c_password) {
        if(c_password != password) return false;
        return true;
    }

    function verifyGenre() {
        if(genre == 'Masculino'){
            setCheckedMasc(true);
            setCheckedFem(false);
        }else if(genre == 'Feminino'){
            setCheckedFem(true);
            setCheckedMasc(false);
        }
    }

    // function verifyPasswordLength(pass) {
    //     if(pass.length() <= 6) return false;
    //     return true;
    // }

    function signUpUser() {
        if(!disableButton){
            const user = { email, password };
            user_service.createUser(user)
                .then(() => navigation.navigate('VerifyAccount'))
                .catch((err) => console.log(err))
        }
    }

    function verifyFormItems() {
        if( email === 'teste@example.com' || !password  || !name || !formatEmail(email) || !verifyConfirmPassword(confirmPassword) || !genre )
            setDisableButton(true);
        else
            setDisableButton(false);
    }

    return (
        <View>
            <View>
                <View>
                    <Text style={LoginStyles.loginTitle}>Cadastrar</Text>
                </View>
            </View>
            <View style={LoginStyles.formArea}>
                <View style={LoginStyles.inputEmail}>
                    <Input
                        placeholder='nome@email.com'
                        autoFocus={true}
                        keyboardType='email-address'
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={20}
                                color='#191d24'
                            />
                        }
                        selectionColor='#5388d0'
                        inputStyle={{ paddingLeft: 7, }}
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
                        returnKeyType = 'next'
                        keyboardType={!showPass?'default':'visible-password'}
                        secureTextEntry={true}
                        // errorMessage={verifyPasswordLength(password) ? '' : 'A senha deve conter pelo menos 6 caracteres.'}
                        onChangeText={(password) => { setPassword( password ) }}
                    />
                </View>
                <View style={LoginStyles.inputPassword}>
                    <Input
                        placeholder='confirmar senha'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={20}
                                color='#191d24'
                            />
                        }
                        inputStyle={{ paddingLeft: 7, }}
                        selectionColor='#5388d0'
                        returnKeyType = 'next'
                        keyboardType={!showPass?'default':'visible-password'}
                        secureTextEntry={true}
                        onChangeText={(c_password) => { setConfirmPassword( c_password ) }}
                        errorMessage={verifyConfirmPassword(confirmPassword) ? '' : 'As senhas digitadas não coincidem.'}
                    />
                </View>
                <View style={LoginStyles.inputPassword}>
                    <Input
                        placeholder='Nome'
                        leftIcon={
                            <Icon
                                name='user'
                                size={20}
                                color='#191d24'
                            />
                        }
                        inputStyle={{ paddingLeft: 7, }}
                        selectionColor='#5388d0'
                        returnKeyType = 'done'
                        keyboardType='name-phone-pad'
                        onChangeText={(name) => { setName( name );}}
                        onSubmitEditing={() => signUpUser()}
                    />
                </View>
                <View>
                    <CheckBox
                        center
                        title='Masculino'
                        iconRight
                        iconType='font-awesome-5'
                        checkedIcon='check-circle'
                        uncheckedIcon='dot-circle'
                        textStyle={{ fontFamily: 'sans-serif',}}
                        checkedColor='#5388d0'
                        checked={checkedMasc}
                        onPress={() => setGenre('Masculino')}
                    />
                    <CheckBox
                        center
                        title='Feminino'
                        iconRight
                        iconType='font-awesome-5'
                        checkedIcon='check-circle'
                        uncheckedIcon='dot-circle'
                        checkedColor='#5388d0'
                        checked={checkedFem}
                        onPress={() => setGenre('Feminino')}
                    />
                </View>
                <View>
                    <Button buttonStyle={LoginStyles.loginBtn} disabled={disableButton} title="Cadastrar" onPress={() => signUpUser()} />
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