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

import ObjectiveController from '../../controllers/objective/objective_controller';

const objective_controller = new ObjectiveController();


export default function CreateObjectiveModal({ toggleCreateObjectiveModal, pid }) {
    const [title, setTitle] = useState(null);
    const [cost, setCost] = useState(null);
    const [randomPoints, setRandomPoints] = useState(true);

    const [canCreateObjective, setCanCreateObjective] = useState(false);

    useEffect(() => {
        verifyForm();
    }, [title, cost])

    function verifyTitle(value) {
        if(value === '') return false;
        return true;
    }

    function verifyCost(value) {
        if(!randomPoints){
            if(value === '') return false;
            return true;
        }
        return true
    }

    function verifyCostValue(value) {
        if(!randomPoints){
            if(value < 200) return 'Valor mínimo de 200 pontos';
            else if (value > 900) return 'Valor máximo de 900 pontos';
            return ''
        }
        return 'random_points';
    }

    function verifyForm() {
        if(!randomPoints){
            if((title === '' || !title) || !verifyCost(cost) || verifyCostValue(cost) !== '' )
                setCanCreateObjective(false);
            else setCanCreateObjective(true);
        }else{
            if((title === '' || !title)) setCanCreateObjective(false);
            else setCanCreateObjective(true);
        }
    }

    function saveObjective() {
        let objective;
        if(randomPoints){
            let randomPts = Math.floor((Math.random() * 950) + 200);
            while(randomPts > 950){
                randomPts = Math.floor((Math.random() * 950) + 200);
            }
            objective = { title, cost: randomPts };
        }else{
            objective = { title, cost };
        }
        objective_controller.create(objective, pid)
            .then(() => {
                Toast.show('Objetivo criado com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleCreateObjectiveModal(false);
            })
            .catch((error) => {
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
                <Text style={styles.titleText}>Crie seu objetivo</Text>
            </View>
            <View>
                <Input
                    placeholder='Ex.: Comprar mouse, comprar PC, comprar teclado'
                    leftIcon={
                        <Icon
                            name='thumbtack'
                            size={20}
                            color='#191d24'
                        />
                    }
                    inputStyle={{ paddingLeft: 7, }}
                    inputContainerStyle={{ marginTop: 20, }}
                    selectionColor='#5388d0'
                    returnKeyType = 'next'
                    keyboardType='name-phone-pad'
                    errorMessage={verifyTitle(title) ? '' : 'Campo obrigatório'}
                    onChangeText={(title) => { setTitle( title );}}
                />
            </View>
            {
                !randomPoints &&
                <View>
                    <Input
                        placeholder='Custo de pontos'
                        leftIcon={
                            <Icon
                                name='coins'
                                size={20}
                                color='#191d24'
                            />
                        }
                        inputStyle={{ paddingLeft: 7, }}
                        inputContainerStyle={{ width: 96, }}
                        selectionColor='#5388d0'
                        returnKeyType = 'done'
                        textContentType = 'telephoneNumber'
                        keyboardType='numeric'
                        errorMessage={verifyCost(cost) ? verifyCostValue(cost) : 'Campo obrigatório'}
                        onChangeText={(cost) => { setCost( cost );}}
                    />
                </View>
            }
            <View style={{ marginBottom: 25, }} >
                <CheckBox
                    size={20}
                    title='Definir custo automáticamente'
                    containerStyle={{ marginTop: 5, }}
                    iconLeft
                    iconType='font-awesome-5'
                    checkedIcon='check-circle'
                    uncheckedIcon='dot-circle'
                    checkedColor='#5388d0'
                    checked={randomPoints}
                    onPress={() => setRandomPoints(!randomPoints)}
                />
            </View>
            <View style={styles.closeModalArea}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => toggleCreateObjectiveModal(false)}>
                    <Icon name="times" size={38} color="#b31d12" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!canCreateObjective} style={canCreateObjective ? styles.createObjectiveButton : styles.createDisabled} onPress={() => saveObjective()}>
                    <Icon name="check" size={38} color={canCreateObjective ? "#34cc0e" : "#198000"} />
                </TouchableOpacity>
            </View>
        </>
    );
}