import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Avatar,
    Divider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Loading from '../Loading';


export default function ChangePerson({ persons, toggleCreatePersonModal, selectPerson, menuPersonsHandle }) {
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400)
    }, [])

    function selectedPerson(person) {
        selectPerson(person);
        menuPersonsHandle(false);
    }

    return (
        <>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>Mudar pessoa</Text>
            </View>
            <View style={styles.listPersons}>
                {
                    !!persons && persons.map((person, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => selectedPerson(person)} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, .055)', paddingBottom: 5, marginTop: 5, }} >
                                <Avatar.Image source={{ uri: person.profilePic }} size={34} />
                                <Text style={{ fontSize: 18, marginLeft: 7, fontFamily: 'sans-serif', }} >
                                    {person.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
            <View style={{ alignItems: 'center', marginTop: 30, }} >
                <TouchableOpacity style={styles.addPersonButton} onPress={() => toggleCreatePersonModal(true) }>
                    <Icon name="plus" size={21} style={{ marginTop: 1, }} />
                    <Text style={{ fontSize: 17, marginLeft: 5, fontFamily: 'sans-serif', }} >Adicionar pessoa</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}