import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Button,
    Input,
    CheckBox,
} from 'react-native-elements';
import {
    Avatar,
    Divider
} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickCartoonImage from './PickCartoonImage';

import styles from './styles';
import PersonController from '../../controllers/person/person_controller';

const person_controller = new PersonController();


export default function CreatePersonModal({ toggleCreatePersonModal, uid }) {
    const [name, setName] = useState('a');
    const [genre, setGenre] = useState(null);
    const [profilePic, setProfilePic] = useState('');
    const [cartoons, setCartoons] = useState('');
    const [cartoonsLoaded, setCartoonsLoaded] = useState(false);

    const [canCreatePerson, setCanCreatePerson] = useState(false);
    const [checkedMasc, setCheckedMasc] = useState(false);
    const [checkedFem, setCheckedFem] = useState(false);

    useEffect(() => {
        verifyGenre();
        verifyForm();
        fetchProfileCartoons();
    }, [genre, name, profilePic])

    function verifyName(value) {
        if(value.length == 0) return false
        return true
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

    function verifyForm() {
        if((name === 'a' || !name) || !genre || profilePic === '' )
           setCanCreatePerson(false);
        else setCanCreatePerson(true);
    }

    function fetchProfileCartoons() {
        person_controller.fetchProfileCartoons()
            .then(cartoon => {
                cartoon.onSnapshot(snapshot => {
                    let arr_cartoons = []
                    snapshot.forEach(res => {
                        arr_cartoons.push(res.data());
                        setCartoonsLoaded(true);
                    })
                    setCartoons(arr_cartoons);
                })
            })
            .catch(err => console.log(err));
    }

    function savePerson() {
        let person = {
            name, genre, profilePic,
        }
        person_controller.create(person, uid)
            .then(() => {
                Toast.show('Pessoa cadastrada com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleCreatePersonModal(false);
            })
            .catch(err => {
                Toast.show(err.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                })
            })
    }

    return(
        <>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>Cadastrar pessoa</Text>
            </View>
            <View>
                {
                    !!cartoonsLoaded && <PickCartoonImage setProfilePic={setProfilePic} cartoons={cartoons} />
                }
            </View>
            <Divider style={{ marginTop: 20, }} />
            <View>
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
                    inputContainerStyle={{ marginTop: 30, }}
                    selectionColor='#5388d0'
                    returnKeyType = 'done'
                    keyboardType='name-phone-pad'
                    errorMessage={verifyName(name) ? '' : 'Campo obrigatório'}
                    onChangeText={(name) => { setName( name );}}
                />
            </View>
            <View style={styles.checkBoxGenre}>
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
            <View style={styles.closeModalArea}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => toggleCreatePersonModal(false)}>
                    <Icon name="times" size={38} color="#b31d12" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!canCreatePerson} style={canCreatePerson ? styles.createPersonButton : styles.createDisabled} onPress={() => savePerson()}>
                    <Icon name="check" size={38} color={canCreatePerson ? "#34cc0e" : "#198000"} />
                </TouchableOpacity>
            </View>
        </>
    );
}