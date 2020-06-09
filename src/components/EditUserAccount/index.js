import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    Button,
    Input,
    CheckBox,
} from 'react-native-elements';
import {
    Divider
} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

import UserController from '../../controllers/user/user_controller';

const user_controller = new UserController();


export default function EditUserAccount({
    toggleEditAccountModal,
    user,
    modalType,
    value
}) {

    const [newValue, setNewValue] = useState(null);

    const [modalContent, setModalContent] = useState(null);
    const [canSaveChanges, setCanSaveChanges] = useState(false);

    useEffect(() => {
        verifyForm();
        settingModalContent();
    }, [newValue])

    function settingModalContent() {
        if(modalType == 'email'){
            setModalContent({
                title: 'Editar email',
                input_type: 'email-address',
                input_value: user.email,
            })
        }
        else if(modalType == 'name'){
            setModalContent({
                title: 'Editar nome',
                input_type: 'name-phone-pad',
                input_value: user.name,
            })
        }
    }

    function verifyNewValue(value) {
        if(value === '') return false;
        return true;
    }

    function formatEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function verifyForm() {
        if(modalType == 'email'){
            if( !formatEmail(newValue) )
                setCanSaveChanges(false);
            else
                setCanSaveChanges(true);
        }else if(modalType == 'name'){
            if( !newValue )
                setCanSaveChanges(false);
            else
                setCanSaveChanges(true);
        }
    }

    function saveChanges() {
        user_controller.update(user.id, newValue, modalType)
            .then(() => {
                Toast.show('Usuário atualizado', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleEditAccountModal(false);
            })
            .catch(error => {
                Toast.show(error.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
    }

    return(
        <>
            <View style={styles.titleArea}>
                { modalContent && <Text style={styles.titleText}>{modalContent.title}</Text>}
            </View>
            <View>
                <Input
                    placeholder={modalContent?.input_value}
                    leftIcon={
                        <Icon
                            name={modalType == 'email' ? 'envelope' : 'user'}
                            size={20}
                            color='#191d24'
                        />
                    }
                    inputStyle={{ paddingLeft: 7, }}
                    inputContainerStyle={{ marginTop: 20, }}
                    selectionColor='#5388d0'
                    returnKeyType = 'next'
                    keyboardType={modalContent?.input_type}
                    errorMessage={modalType=='email' ? formatEmail(newValue) ? '' : 'Digite um email válido.' : verifyNewValue(newValue) ? '' : 'Campo obrigatório'}
                    onChangeText={(inputValue) => { setNewValue( inputValue );}}
                />
            </View>
            
            <View style={styles.closeModalArea}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => toggleEditAccountModal(false)}>
                    <Icon name="times" size={38} color="#b31d12" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!canSaveChanges} style={canSaveChanges ? styles.createObjectiveButton : styles.createDisabled} onPress={() => saveChanges()}>
                    <Icon name="check" size={38} color={canSaveChanges ? "#34cc0e" : "#198000"} />
                </TouchableOpacity>
            </View>
        </>
    );
}