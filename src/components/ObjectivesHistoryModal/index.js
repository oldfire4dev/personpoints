import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
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


export default function ObjectivesHistoryModal({ toggleObjectiveHistoryModal, objectives, }) {

    // useEffect(() => {
    //     verifyForm();
    // }, [finished, notFulfilled])


    function dateFormat(updatedAt) {
        let date = new Date(updatedAt);
        let day, month, year;
        day = date.getDay() > 10 ? date.getDay() : '0'+date.getDay();
        month = date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth();
        year = date.getFullYear();
        let fullDate = `${day}/${month}/${year}`;
        return fullDate;
    }

    function hourFormat(updatedAt) {
        let date = new Date(updatedAt);
        let hour, minutes;
        hour = date.getHours() >= 10 ? date.getHours() : '0'+date.getHours();
        minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes();
        let fullHours = `${hour}h${minutes}`;
        return fullHours;
    }

    function alertDelete(oid) {
        Alert.alert("Excluir objetivo", "Quer excluir este objetivo? Você não poderá restaurá-lo depois.", [
            {
              text: "Não, me enganei",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim, eu quero", onPress: () => deleteObjective(oid) }
          ]);
    }

    function deleteObjective(oid) {
        objective_controller.delete(oid)
            .then(() => {
                Toast.show('Objetivo excluído', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
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

    function restoreObjective(oid) {
        let objectiveRestoreUpdates = { cancelled: false }
        objective_controller.cancell(oid, objectiveRestoreUpdates)
            .then(() => {
                Toast.show('Objetivo restaurado', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                toggleObjectiveHistoryModal(false)
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
                <Text style={styles.titleText}>Histórico</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    objectives.data.map((objective, index) => (
                        <View key={index} style={styles.objectiveStyle} >
                            <Text style={styles.objectiveTitle}>{objective.title}</Text>
                            <View style={styles.hoursAndDateObjective}>
                                <View>
                                    <Text style={ styles.dateTitleText }>Criado em:</Text>
                                    <Text style={{ textAlign: 'left', fontSize: 13, color: '#e9e9e9', fontStyle: 'italic', }}>{dateFormat(objective.createdAt)}</Text>
                                    <Text style={{ textAlign: 'left', fontSize: 13, color: '#e9e9e9', fontStyle: 'italic', }}>{hourFormat(objective.createdAt)}</Text>
                                </View>
                                <View>
                                    <Text style={ styles.dateTitleText } >{objective.cancelled ? 'Cancelado em:' : 'Concluído em:'}</Text>
                                    {
                                        hourFormat(objective.updatedAt) != hourFormat(objective.createdAt) ? 
                                        (
                                            <>
                                                <Text style={{ textAlign: 'right', fontSize: 13, color: '#e9e9e9', fontStyle: 'italic', }}>{dateFormat(objective.updatedAt)}</Text>
                                                <Text style={{ textAlign: 'right', fontSize: 13, color: '#e9e9e9', fontStyle: 'italic', }}>{hourFormat(objective.updatedAt)}</Text>
                                            </>
                                        ) :
                                        (
                                            <Text style={{ textAlign: 'right', fontSize: 13, color: '#e9e9e9', fontStyle: 'italic', }}>--/--/--</Text>
                                        )
                                    }
                                    
                                </View>
                            </View>
                            <View style={styles.objectiveValuePoints} >
                                <View>
                                    <Icon name='coins' size={16} color='#ededed' style={{ marginLeft: 5 }} />
                                    <Text style={{ fontSize: 12, color: '#ededed', }} >-{objective.cost}</Text>
                                </View>
                                { objective.cancelled &&
                                    <TouchableOpacity
                                        style={{ marginTop: 4, }}
                                        onPress={() => restoreObjective(objective.id)}
                                    >
                                        <Icon size={19} name="sync" color={'#4a4a4a'} />
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    style={{ marginTop: 4, }}
                                    onPress={() => alertDelete(objective.id)}
                                >
                                    <Icon size={19} name="trash" color={'#b31d12'} />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    ))
                }
            </ScrollView>
            
        </>
    );
}