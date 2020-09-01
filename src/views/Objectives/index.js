import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Alert,
    StatusBar
} from 'react-native';
import ObjectivesStyles from '../../styles/Objectives';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    Avatar,
} from 'react-native-paper';
import {
    Overlay,
} from 'react-native-elements';
import Toast from 'react-native-root-toast';
import Loading from '../../components/Loading';

import ChangePerson from '../../components/ChangePerson';
import CreateObjectiveModal from '../../components/CreateObjectiveModal';
import ObjectivesHistoryModal from '../../components/ObjectivesHistoryModal';

import DefaultProfileImg from '../../assets/default-profile-pic.png';
import UserController from '../../controllers/user/user_controller';
import PersonController from '../../controllers/person/person_controller';
import ObjectiveService from '../../services/objective/objective_service';
import ObjectiveController from '../../controllers/objective/objective_controller';


const objective_service = new ObjectiveService();
const objective_controller = new ObjectiveController();

const user_controller = new UserController();
const person_controller = new PersonController();

export default class Objectives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            persons: { isEmpty: true },
            objectives: { isEmpty: true },
            selectedPerson: null,
            selectedObjective: null,
            showMenuPerson: false,
            showObjectiveInfoModal: false,
            showCreateObjectiveModal: false
        }
    }

    fetchUserId = () => {
        user_controller.fetchUid()
            .then(result => this.fetchPersons(result))
            .catch(err => console.log(err));
    }

    setActiveUser = () => {
        let lastPerson = this.state.persons.data.length - 1;
        this.setState({ selectedPerson: this.state.persons.data[lastPerson] });
    }

    fetchPersons = (uid) => {
        person_controller.fetchAllPersons(uid)
            .then(data => {
                data.onSnapshot(snapshot => {
                    let data=[];
                    if(snapshot.empty) this.setState({ persons: {isEmpty: true}, isLoading: false })
                    else {
                        snapshot.forEach(res => {
                            data.push(res.data());
                        })
                        this.setState({ 
                            persons: {
                                data,
                                isEmpty: false
                            },
                        })
                        this.setActiveUser();
                        if(this.state.persons) this.fetchObjectives();
                    }
                })
            })
            .catch(err => console.log(err))
    }

    fetchObjectives = () => {
        if(this.state.selectedPerson){
            objective_controller.fetchAllObjectives(this.state.selectedPerson.id)
                .then(data => {
                    data.onSnapshot(snapshot => {
                        let data = [];
                        if(snapshot.empty) this.setState({ objectives: {isEmpty: true}, isLoading: false })
                        else {
                            snapshot.forEach(res => {
                                data.push(res.data());
                            })
                            this.setState({
                                objectives: {
                                    data,
                                    isEmpty: false
                                },
                                isLoading: false
                            })
                        }
                    })
                })
                .catch(err => console.log(err))
        }
    }

    menuPersonsHandle = (value) => {
        this.setState({ showMenuPerson: value });
    }

    toggleCreateObjectiveModal = (show) => {
        this.setState({ showCreateObjectiveModal: show })
    }

    toggleObjectiveHistoryModal = (show) => {
        this.setState({ showObjectiveInfoModal: show, });
    }

    openDrawerMenu = () => {
        this.props.navigation.openDrawer();
    }

    updatePersonPoints = (cost) => {
        person_controller.updatePersonPoints(
            this.state.selectedPerson.id,
            this.state.selectedPerson.points,
            cost
        )
            .then(() => console.log('Objetivo conquistado. Pontos atualizados'))
            .catch(err => console.log(err))
    }

    finishedObjective = (oid, cost) => {
        let objectiveUpdate = { finished: true };
        objective_controller.update(oid, objectiveUpdate)
            .then(() => {
                this.updatePersonPoints(-cost);
                Toast.show('Objetivo conquistado', {
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

    alertRecuseObjective = (oid) => {
        Alert.alert("Cancelar objetivo", "Quer cancelar este objetivo? Você pode restaurá-lo depois, no histórico de objetivos.", [
            {
              text: "Não, me enganei",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim, eu quero", onPress: () => this.recusedObjective(oid) }
          ]);
    }
    
    selectPerson = (person) => {
        if(person){
            this.setState({ selectedPerson: person });
        }
    }

    recusedObjective = (oid) => {
        let objectiveUpdate = { cancelled: true };
        objective_controller.cancell(oid, objectiveUpdate)
            .then(() => {
                Toast.show('Objetivo cancelado', {
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

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.fetchUserId();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedPerson&&prevState.selectedPerson.id !== this.state.selectedPerson.id){
           this.fetchObjectives();
        }
    }

    render() {
        return (
            <View style={ObjectivesStyles.app}>
                <View style={ObjectivesStyles.headerArea}>
                    <View style={ObjectivesStyles.personArea}>
                        <TouchableOpacity onPress={() => this.openDrawerMenu()}>
                            <Icon name="bars" size={26} color="#474747" />
                        </TouchableOpacity>
                        {
                            this.state.persons.isEmpty ?
                            <Text style={{ fontStyle: 'italic', marginTop: 4, }} >Nenhuma pessoa cadastrada</Text>
                            :
                            <>
                                {!!this.state.selectedPerson && <Text style={{ color: '#474747', fontSize: 18, fontFamily: 'sans-serif', fontWeight: 'bold', marginTop: 3,}} >{this.state.selectedPerson.name}</Text>}
                                <TouchableOpacity onPress={() => this.menuPersonsHandle(true)}>
                                    <Avatar.Image size={32} source={ this.state.selectedPerson ? { uri:  this.state.selectedPerson.profilePic } : DefaultProfileImg } />
                                </TouchableOpacity>
                                <Overlay
                                    isVisible={this.state.showMenuPerson}
                                    onBackdropPress={() => this.menuPersonsHandle(false)}
                                    animated={true}
                                    animationType='fade'
                                    overlayStyle={ObjectivesStyles.modalChangePersonStyle}
                                >
                                    <ChangePerson createPersonField={false} persons={this.state.persons.data} setState={this.setState} toggleCreatePersonModal={this.toggleCreatePersonModal} selectPerson={this.selectPerson} menuPersonsHandle={this.menuPersonsHandle} />
                                </Overlay>
                            </>
                        }
                    </View>
                </View>
                <View style={ObjectivesStyles.contentArea}>
                    {
                        this.state.isLoading ? 
                            <Loading loadingContentStyle={{ marginTop: 120, }}/>
                        :
                        this.state.persons.isEmpty ?
                            <View style={ObjectivesStyles.contentPersonsEmpty}>
                                <Icon name="frown-open" size={72} color="#343434"/>
                                <Text style={ObjectivesStyles.noPersonText}>Nenhuma pessoa foi encontrada</Text>
                            </View>
                        :
                        this.state.objectives.isEmpty ?
                            <View style={ObjectivesStyles.noObjectivesFoundArea}>
                                <Icon name="heart-broken" size={116} />
                                <Text style={{ fontSize:18, marginTop: 30, fontFamily: 'sans-serif', fontStyle: 'italic', }} >Você ainda não tem nenhum objetivo.</Text>
                            </View>
                            :
                            <>
                                {
                                    !!this.state.objectives.data &&
                                    <View style={ObjectivesStyles.listOfObjectivesArea}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name='bullseye' size={19} style={{ marginRight: 4 }} />
                                                <Text style={{ fontSize: 19, fontWeight: 'bold', letterSpacing: .45, }} >Objetivos</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => this.toggleObjectiveHistoryModal(true)}>
                                                    <Text style={{ fontSize:16, color: '#5388d0' }} >Ver histórico</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <ScrollView style={{ marginTop: 10, }} >
                                            {
                                                this.state.objectives.data.map((objective, index) => (
                                                    (!objective.finished && !objective.cancelled) &&
                                                    <View key={index} style={ObjectivesStyles.objectiveStyle} >
                                                        <Text>{objective.title}</Text>
                                                        <View style={ObjectivesStyles.objectiveValuePoints} >
                                                            <Icon name='coins' size={16} color='#191d24' style={{ marginLeft: 5 }} />
                                                            <Text style={{ fontSize: 12, }} >-{objective.cost}</Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            style={{ position: 'absolute', right: 49, }}
                                                            onPress={() => this.alertRecuseObjective(objective.id)}
                                                        >
                                                            <Icon size={32} name="times-circle" color={'#b31d12'} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{ position: 'absolute', right: 12, }}
                                                            onPress={() => this.finishedObjective(objective.id, objective.cost)}
                                                        >
                                                            <Icon size={32} name="check-circle" color={'#34cc0e'}  />
                                                        </TouchableOpacity>
                                                    </View>
                                                ))
                                            }
                                            <Overlay
                                                isVisible={this.state.showObjectiveInfoModal}
                                                onBackdropPress={() => this.toggleObjectiveHistoryModal(false, null)}
                                                animated={true}
                                                animationType='fade'
                                                overlayStyle={ObjectivesStyles.modalObjectiveHistoryStyle}
                                            >
                                                <ObjectivesHistoryModal objectives={this.state.objectives} toggleObjectiveHistoryModal={this.toggleObjectiveHistoryModal} />
                                            </Overlay>
                                        </ScrollView>
                                    </View>
                                }
                            </>
                    }
                    <Overlay
                        isVisible={this.state.showCreateObjectiveModal}
                        onBackdropPress={() => this.toggleCreateObjectiveModal(false)}
                        animated={true}
                        animationType='fade'
                        overlayStyle={ObjectivesStyles.modalCreateObjectiveStyle}
                    >
                        <CreateObjectiveModal
                            toggleCreateObjectiveModal={this.toggleCreateObjectiveModal}
                            pid={this.state.selectedPerson && this.state.selectedPerson.id}
                        />
                    </Overlay>
                </View>
                <View style={ObjectivesStyles.createObjectiveArea}>
                    <TouchableOpacity style={ObjectivesStyles.createObjectiveButton} onPress={() => this.toggleCreateObjectiveModal(true)}>
                        <Text style={{ fontSize: 17, color: '#fff'}} >Criar objetivo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}