import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Avatar,
} from 'react-native-paper';
import { Overlay } from 'react-native-elements';
import CreatePersonModal from '../../components/CreatePersonModal';
import ChangePerson from '../../components/ChangePerson';

import styles from '../../components/ChangePerson/styles';
import DashboardStyles from './../../styles/Dashboard';

import DefaultProfileImg from '../../assets/default-profile-pic.png';
import Loading from '../../components/Loading';
import UserService from '../../services/users/user_service';
import PersonController from '../../controllers/person/person_controller';

const user_service = new UserService();
const person_controller = new PersonController();
export default class Dashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            persons: {
                isEmpty: true
            },
            showCreatePersonModal: false,
            showMenuPerson: false,
            selectedPerson: null,
        }
    }

    backAction = () => {
        Alert.alert("Sair", "Deseja realmente sair do aplicativo?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    
    menuPersonsHandle = (value) => {
        this.setState({ showMenuPerson: value })
    }

    logoutUser = () => {
        user_service.logoutUser()
        this.props.navigation.navigate('Main');
    }

    toggleCreatePersonModal = (show) => {
        this.setState({ showCreatePersonModal: show })
    }

    selectPerson = (person) => {
        if(person) this.setState({ selectedPerson: person });
        else {
            if(this.state.persons.data){
                let lastPerson = this.state.persons.data.length - 1;
                this.setState({ selectedPerson: this.state.persons.data[lastPerson] });
            }
        }
    }

    fetchUser = () => {
        const user = this.props.route.params.user;
        this.setState({ user })
    }

    fetchPersons = () => {
        const { id } = this.props.route.params.user;
        person_controller.fetchAllPersons(id)
            .then(data => {
                data.onSnapshot(snapshot => {
                    let data=[];
                    if(snapshot.empty) this.setState({ persons: {isEmpty: true} })
                    else {
                        snapshot.forEach(res => {
                            data.push(res.data());
                        })
                        this.setState({ 
                            persons: {
                                data,
                                isEmpty: false
                        } })
                        this.selectPerson();
                    }
                })
            })
            .catch(err => console.log(err))
    }

    openDrawerMenu = () => {
        this.props.navigation.openDrawer();
    }

    updatePersonTier = () => {
        person_controller.updatePersonTier(this.state.selectedPerson.id, 
        this.state.selectedPerson.points, 1200)
            .then(() => {
                console.log('Pessoa Atualizada')
            })
            .catch((err) => console.log(err.message) )
    }

    componentDidMount() {
        this._isMounted = true;
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        if (this._isMounted) {
            this.fetchUser();
            this.fetchPersons();
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        this._isMounted = false;
    }

    render() {
        return (
            <View style={DashboardStyles.app}>
                <View style={DashboardStyles.headerArea}>
                    <View style={DashboardStyles.personArea}>
                        <TouchableOpacity onPress={() => this.openDrawerMenu()}>
                            <Icon name="bars" size={26} color="#e4e4e4" />
                        </TouchableOpacity>
                        {
                            this.state.persons.isEmpty ?
                                <TouchableOpacity onPress={() => this.setState({ showCreatePersonModal: true })}>
                                    <Icon name="user-plus" size={22} color="#e4e4e4" />
                                </TouchableOpacity>
                            :
                            <>
                                {!!this.state.selectedPerson && <Text style={DashboardStyles.personName} >{this.state.selectedPerson.name}</Text> }
                                <TouchableOpacity onPress={() => this.menuPersonsHandle(true)}>
                                    <Avatar.Image size={32} source={ this.state.selectedPerson ? { uri:  this.state.selectedPerson.profilePic } : DefaultProfileImg } />
                                </TouchableOpacity>
                            </>
                                
                        }
                        <Overlay
                            isVisible={this.state.showMenuPerson}
                            onBackdropPress={() => this.menuPersonsHandle(false)}
                            animated={true}
                            animationType='fade'
                            overlayStyle={DashboardStyles.modalChangePersonStyle}
                        >
                            <ChangePerson persons={this.state.persons.data} setState={this.setState} toggleCreatePersonModal={this.toggleCreatePersonModal} selectPerson={this.selectPerson} menuPersonsHandle={this.menuPersonsHandle} />
                        </Overlay>
                    </View>
                    <View style={DashboardStyles.personInfoArea}>
                        {
                            this.state.persons.isEmpty ?
                            <>
                                <Icon name="frown-o" size={48} color="#fff"/>
                                <Text style={DashboardStyles.noPersonText}>Nenhuma pessoa foi encontrada</Text>
                            </>
                            :
                            <>
                                {!!this.state.selectedPerson &&
                                    <>
                                        <View style={DashboardStyles.personTierImageArea}>
                                            <Image style={DashboardStyles.personTierImage} source={{ uri: this.state.selectedPerson.tierURL }} /> 
                                        </View>
                                        <View style={DashboardStyles.personTierNameArea}>
                                            <Text style={DashboardStyles.personTierName} >{this.state.selectedPerson.tierName} {this.state.selectedPerson.tierNumber ? this.state.selectedPerson.tierNumber : null}</Text>
                                        </View>
                                        <View style={DashboardStyles.personPointsArea}>
                                            <Text style={DashboardStyles.personPoints} >{this.state.selectedPerson.points}{this.state.selectedPerson.nextTierPoints ? '/'+this.state.selectedPerson.nextTierPoints : null }</Text>
                                        </View>
                                    </>
                                }
                            </>
                        }
                    </View>
                </View>
                <View style={DashboardStyles.contentArea}>
                    {
                        this.state.persons.isEmpty ?
                            <View style={DashboardStyles.createPersonArea}>
                                <Text style={DashboardStyles.createPersonText}>Cadastrar Nova Pessoa</Text>
                                <TouchableOpacity style={DashboardStyles.createPersonButton} onPress={() => this.toggleCreatePersonModal(true)}>
                                    <Icon name="plus" size={48} color="#fff" />
                                </TouchableOpacity>
                                <Overlay
                                    isVisible={this.state.showCreatePersonModal}
                                    onBackdropPress={() => this.toggleCreatePersonModal(false)}
                                    animated={true}
                                    animationType='fade'
                                    overlayStyle={DashboardStyles.modalStyle}
                                >
                                    <CreatePersonModal toggleCreatePersonModal={this.toggleCreatePersonModal} uid={this.state.user.id} />
                                </Overlay>
                            </View>
                        :
                            <View style={DashboardStyles.tasksTextArea}>
                                <Overlay
                                    isVisible={this.state.showCreatePersonModal}
                                    onBackdropPress={() => this.toggleCreatePersonModal(false)}
                                    animated={true}
                                    animationType='fade'
                                    overlayStyle={DashboardStyles.modalStyle}
                                >
                                    <CreatePersonModal toggleCreatePersonModal={this.toggleCreatePersonModal} uid={this.state.user.id} />
                                </Overlay>
                                <Text style={DashboardStyles.tasksText}>Tarefas</Text>
                                <TouchableOpacity onPress={() => this.updatePersonTier()}>
                                    <Text>Teste</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        );
    }
}