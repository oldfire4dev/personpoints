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

import TaskController from '../../controllers/task/task_controller';

const task_controller = new TaskController();


export default function CreateTaskModal({ toggleCreateTaskModal, pid }) {
    const [title, setTitle] = useState(null);
    const [earn, setEarn] = useState(null);
    const [simpleTask, setSimpleTask] = useState(false);
    const [randomPoints, setRandomPoints] = useState(true);

    const [canCreateTask, setCanCreateTask] = useState(false);

    useEffect(() => {
        verifyForm();
    }, [title, earn, simpleTask])

    function verifyTitle(value) {
        if(value === '') return false;
        return true;
    }

    function verifyEarn(value) {
        if(!randomPoints){
            if(value === '') return false;
            return true;
        }
        return true
    }

    function verifyEarnValue(value) {
        if(!randomPoints){
            if(value < 15) return 'Valor mínimo de 15 pontos';
            else if (value > 120) return 'Valor máximo de 120 pontos';
            return ''
        }
        return 'random_points';
    }

    function verifyForm() {
        if(!randomPoints){
            if((title === '' || !title) || !verifyEarn(earn) || verifyEarnValue(earn) !== '' )
                setCanCreateTask(false);
            else setCanCreateTask(true);
        }else{
            if((title === '' || !title)) setCanCreateTask(false);
            else setCanCreateTask(true);
        }
    }

    function saveTask() {
        let task;
        if(randomPoints){
            let randomPts = Math.floor((Math.random() * 150) + 15);
            while(randomPts > 150){
                randomPts = Math.floor((Math.random() * 150) + 15);
            }
            task = {
                title, earn: randomPts, simpleTask
            };
        }else{
            task = {
                title, earn, simpleTask
            };
        }
        task_controller.create(task, pid)
            .then(() => {
                Toast.show('Tarefa criada com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleCreateTaskModal(false);
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
                <Text style={styles.titleText}>Crie sua tarefa</Text>
            </View>
            <View>
                <Input
                    placeholder='Ex.: Limpar casa, Estudar, Fazer atividade'
                    leftIcon={
                        <Icon
                            name='thumbtack'
                            size={20}
                            color='#191d24'
                        />
                    }
                    inputStyle={{ paddingLeft: 7, }}
                    inputContainerStyle={{ marginTop: 30, }}
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
                        placeholder='Pontos'
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
                        errorMessage={verifyEarn(earn) ? verifyEarnValue(earn) : 'Campo obrigatório'}
                        onChangeText={(earn) => { setEarn( earn );}}
                    />
                </View>
            }
            <View>
                <CheckBox
                    size={20}
                    title='Definir pontos automáticamente'
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
            <View>
                <CheckBox
                    size={20}
                    title='Tarefa única'
                    containerStyle={{ marginTop: 5, }}
                    iconLeft
                    iconType='font-awesome-5'
                    checkedIcon='check-circle'
                    uncheckedIcon='dot-circle'
                    checkedColor='#5388d0'
                    checked={simpleTask}
                    onPress={() => setSimpleTask(!simpleTask)}
                />
                <Text 
                    style={{ alignSelf: 'center', fontStyle: 'italic', fontSize: 11, color: 'rgba(0,0,0, .6)', marginBottom: 35, }}
                >
                    (1 vez concluída, não volta)
                </Text>
            </View>
            <View style={styles.closeModalArea}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => toggleCreateTaskModal(false)}>
                    <Icon name="times" size={38} color="#b31d12" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!canCreateTask} style={canCreateTask ? styles.createTaskButton : styles.createDisabled} onPress={() => saveTask()}>
                    <Icon name="check" size={38} color={canCreateTask ? "#34cc0e" : "#198000"} />
                </TouchableOpacity>
            </View>
        </>
    );
}