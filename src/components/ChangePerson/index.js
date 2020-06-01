import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import {
    Avatar,
    Divider,
} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Loading from '../Loading';

import PersonController from '../../controllers/person/person_controller';
const person_controller = new PersonController();

export default function ChangePerson({ persons, toggleCreatePersonModal, selectPerson, menuPersonsHandle, createPersonField }) {
    const [isLoading, setIsLoading] = useState(true);
    const [personId, setPersonId] = useState();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400)
    }, [])

    function deletePersonButtonHandle(pid) {
        Alert.alert("Excluir Pessoa", "Quer excluir essa pessoa? Esta ação não terá volta.", [
            {
              text: "Não, me enganei",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim, eu quero", onPress: () => deletePerson(pid) }
          ]);
    }

    function deletePerson(pid) {
        person_controller.delete(pid)
            .then(() => {
                Toast.show('Pessoa foi removida com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
            .catch(err => {
                Toast.show(err.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            });
        menuPersonsHandle(false);
    }

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
                            <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, .055)', paddingBottom: 5, marginTop: 5, }}>
                                <TouchableOpacity onPress={() => selectedPerson(person)} style={{ flexDirection: 'row', alignItems: 'center'}} >
                                    <Avatar.Image source={{ uri: person.profilePic }} size={34} />
                                    <Text style={{ fontSize: 18, marginLeft: 7, fontFamily: 'sans-serif', }} >
                                        {person.name}
                                    </Text>
                                    <Image style={{ width:25, height:25, position: 'absolute', right: 30, top: 7, }} source= {{ uri: person.tierURL, }} />
                                    {/* <Text style={{ fontSize: 12, marginTop: 3, marginLeft: 30, fontFamily: 'sans-serif', }} >
                                        {person.tierName} {person.tierNumber ? person.tierNumber : null}
                                    </Text> */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.removePersonButton} onPress={() => deletePersonButtonHandle(person.id) }>
                                    <Icon name="times" size={21} style={{ marginTop: 8, }} color="#b31d12" />
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </View>
            {
                !!persons && persons.length < 4 ?
                    <View style={{ alignItems: 'center', marginTop: 30, display: createPersonField ? 'flex' : 'none' }} >
                        <TouchableOpacity style={styles.addPersonButton} onPress={() => toggleCreatePersonModal(true) }>
                            <Icon name="plus" size={21} style={{ marginTop: 1, }} />
                            <Text style={{ fontSize: 17, marginLeft: 5, fontFamily: 'sans-serif', }} >Adicionar pessoa</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={{ alignItems: 'center', marginTop: 30, }}>
                        <Text style={{ fontSize: 14, fontFamily: 'sans-serif', fontStyle: 'italic', }} >Máximo(4) de pessoas criado.</Text>
                    </View>
            }
            
        </>
    );
}