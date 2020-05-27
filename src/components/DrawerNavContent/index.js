import React, { useEffect, useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Drawer,
    Text,
    Caption
} from 'react-native-paper';

import {
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultProfileImg from '../../assets/default-profile-pic.png'
import DrawerNavContentStyles from './style';

import UserService from '../../services/users/user_service';
const user_service = new UserService();

export default function DrawerNavContent({props, navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        setUserParams();
    }, [])

    function logOutUser() {
        user_service.logoutUser();
        navigation.navigate('Main');
    }

    function setUserParams() {
        const { name, email } = props.route.params.params.user;
        setName(name);
        setEmail(email);
        // setProfilePic()
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View style={DrawerNavContentStyles.drawerContent}>
                    <View style={DrawerNavContentStyles.userOptionsContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <Avatar.Image source={DefaultProfileImg} />
                            <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#454545', }} >{name}</Text>
                                <Caption style={{ fontSize: 11, color: '#454545', }} >{email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={{ marginTop: 40, }}>
                        <DrawerItem
                            icon={() => (
                                <Icon name="home" size={20} />
                            )}
                            label="Início"
                            labelStyle={DrawerNavContentStyles.itemLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon name="tasks" size={20} />
                            )}
                            label="Tarefas"
                            labelStyle={DrawerNavContentStyles.itemLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon name="bullseye" size={20} />
                            )}
                            label="Objetivos"
                            labelStyle={DrawerNavContentStyles.itemLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon name="cog" size={20} />
                            )}
                            label="Configurações"
                            labelStyle={DrawerNavContentStyles.itemLabel}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                <DrawerItem
                    icon={() => (
                        <Icon name="sign-out" size={20} />
                    )}
                    label="Sair"
                    style={DrawerNavContentStyles.exitContainer}
                    labelStyle={DrawerNavContentStyles.itemLabel}
                    onPress={() => logOutUser()}
                />
            </Drawer.Section>
        </View>
    );
}