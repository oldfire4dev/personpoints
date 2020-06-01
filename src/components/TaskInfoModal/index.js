import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
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
import PersonController from '../../controllers/person/person_controller';

const task_controller = new TaskController();
const person_controller = new PersonController();


export default function TaskInfoModal({ toggleTaskInfoModal, task, personPoints, personId }) {
    const [finished, setFinished] = useState(false);
    const [notFulfilled, setNotFulfilled] = useState(false);
    const [canCreateTask, setCanCreateTask] = useState(false);

    useEffect(() => {
        verifyForm();
    }, [finished, notFulfilled])

    function verifyForm() {
        if(!finished && !notFulfilled)
           setCanCreateTask(false);
        else setCanCreateTask(true);
    }

    function verifyFulfilled(fvalue, nfvalue) {
        setFinished(fvalue)
        setNotFulfilled(nfvalue);
    }

    function updatePersonPoints(pointsAdded) {
        person_controller.updatePersonPoints(personId, personPoints, pointsAdded)
            .then(() => {
                console.log('Pessoa Atualizada')
            })
            .catch((err) => console.log(err.message) )
    }

    function deleteAlert() {
        Alert.alert("Excluir Tarefa", "Quer excluir essa tarefa? Esta ação não terá volta.", [
            {
              text: "Não, me enganei",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim, eu quero", onPress: () => deleteTask() }
        ]);
    }

    function deleteTask() {
        task_controller.delete(task.id)
            .then(() => {
                Toast.show('Tarefa excluída com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
            .catch(error => {
                Toast.show(error.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
    }

    function startTask() {
        let taskStartUpdates = {
            finished: false,
            taskTimesCount: task.taskTimesCount,
            notFulfilled: false
        }
        task_controller.update(task.id, taskStartUpdates)
            .then(() => {
                Toast.show('Tarefa iniciada', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
            .catch(error => {
                Toast.show(error.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
    }

    function updateTaskInfo() {
        let taskUpdate = {
            finished,
            notFulfilled,
            taskTimesCount: task.taskTimesCount + 1,
        }
        task_controller.update(task.id, taskUpdate)
            .then(() => {
                if(taskUpdate.notFulfilled) updatePersonPoints(-task.earn);
                else updatePersonPoints(task.earn);
                Toast.show('Tarefa concluída com sucesso', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
            .catch((error) => {
                Toast.show(error.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleTaskInfoModal(false);
            })
    }

    return(
        <>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>Atualizar tarefa</Text>
            </View>
            <View style={{ marginTop: 10, }}>
                <View style={{ flexDirection: 'row', }}>
                    <Icon
                        name='thumbtack'
                        size={14}
                        color='#191d24'
                        style={{ marginTop: 3, marginRight: 4, }}
                    />
                    <Text style={{ fontSize: 14, }}>Título:</Text>
                </View>
                <Text style={styles.taskTextStyle}>{task.title}</Text>
            </View>
            <View style={{ marginTop: 10, }}>
                <View style={{ flexDirection: 'row', }}>
                    <Icon
                        name='coins'
                        size={14}
                        color='#191d24'
                        style={{ marginTop: 3, marginRight: 4, }}
                    />
                    <Text style={{ fontSize: 14, }}>Pontos:</Text>
                </View>
                <Text style={styles.taskTextStyle}>{task.earn}</Text>
            </View>
            <View style={{ marginTop: 10, }}>
                <View style={{ flexDirection: 'row', }}>
                    <Icon
                        name='stopwatch'
                        size={14}
                        color='#191d24'
                        style={{ marginTop: 3, marginRight: 4, }}
                    />
                    <Text style={{ fontSize: 14, }}>Concluida:</Text>
                </View>
                <Text style={styles.taskTextStyle}>{task.taskTimesCount > 1 ? task.taskTimesCount + ' vezes' : task.taskTimesCount + ' vez'}</Text>
            </View>
            {
                (!task.finished && !task.notFulfilled) ?
                    <>
                        <View style={{ marginTop: 10, }}>
                            <CheckBox
                                size={20}
                                title='Concluída'
                                iconLeft
                                iconType='font-awesome-5'
                                checkedIcon='check-circle'
                                uncheckedIcon='dot-circle'
                                checkedColor='#5388d0'
                                checked={finished}
                                onPress={() => verifyFulfilled(true, false)}
                            />
                        </View>
                        <View>
                            <CheckBox
                                size={20}
                                title={`Não cumprida (-${task.earn})`}
                                iconLeft
                                iconType='font-awesome-5'
                                checkedIcon='check-circle'
                                uncheckedIcon='dot-circle'
                                checkedColor='#5388d0'
                                checked={notFulfilled}
                                onPress={() => verifyFulfilled(false, true)}
                            />
                        </View>
                    </>
                :
                !task.simpleTask ?
                    <View style={{ marginTop: 20, }}>
                        <TouchableOpacity 
                            style={{ flexDirection: 'row', backgroundColor:'#198000', borderRadius: 4, padding: 6, width: 202, justifyContent: 'center', alignSelf: 'center'}} 
                            onPress={() => startTask()}
                        >
                            <Icon name="play" color="#fff" size={16} style={{ marginRight: 6, }} />
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, }} >Iniciar tarefa novamente</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={{ marginTop: 17, marginBottom: 5, }}>
                        <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 14, color: '#474747', }} >Tarefa única</Text>
                    </View>
            }
            <View style={{ marginTop: 10, marginBottom: 25, }}>
                <TouchableOpacity 
                    style={{ flexDirection: 'row', backgroundColor:'#b31d12', borderRadius: 4, padding: 5, width: 202, justifyContent: 'center', alignSelf: 'center'}} 
                    onPress={() => deleteAlert()}
                >
                    <Icon name="trash" color="#fff" size={16} style={{ marginRight: 6, }} />
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, }} >Remover tarefa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.closeModalArea}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => toggleTaskInfoModal(false)}>
                    <Icon name="times" size={38} color="#b31d12" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!canCreateTask} style={canCreateTask ? styles.createTaskButton : styles.createDisabled} onPress={() => updateTaskInfo()}>
                    <Icon name="check" size={38} color={canCreateTask ? "#34cc0e" : "#198000"} />
                </TouchableOpacity>
            </View>
        </>
    );
}