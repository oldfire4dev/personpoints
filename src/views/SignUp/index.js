import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native';
import {
    Button,
    Input,
    CheckBox
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import UserController from '../../controllers/user/user_controller';
import AwesomeAlert from 'react-native-awesome-alerts';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/index';
import LoginStyles from '../../styles/Login';

const user_controller = new UserController();

export default function signUp({ closeModalWhenSubmit }) {
    const { appWidth, appHeight } = Dimensions.get('window');
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState('teste@example.com');
    const [genre, setGenre] = useState(null);
    const [password, setPassword] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState(null);

    const [confirmPassword, setConfirmPassword] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [checkedMasc, setCheckedMasc] = useState(false);
    const [checkedFem, setCheckedFem] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

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

    function verifyPasswordLength(pass) {
        if(pass < 6) return false;
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

    function confirmedError() {
        setErrorAlert(false);
    }

    function signUpUser() {
        if(!disableButton){
            const user = { 
                name,
                email,
                password,
                genre,
                profilePicURL
            };
            user_controller.create(user)
                .then(() => {
                    navigation.navigate('UserVerified');
                    closeModalWhenSubmit();                    
                })
                .catch(error => {
                    setErrorAlert(true);
                    setErrorMsg(error);
                })
        }
    }

    function verifyFormItems() {
        if( email === 'teste@example.com' || !password  || !name || !formatEmail(email) || !verifyConfirmPassword(confirmPassword) || !verifyPasswordLength(password.length) || !genre )
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
                        errorMessage={verifyPasswordLength(password) ? '' : 'A senha deve conter no mínimo 6 caracteres.'}
                        errorStyle={{ color: '#203f78' }}
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
        </View>
    );
}