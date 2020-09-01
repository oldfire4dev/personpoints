import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Avatar,
} from 'react-native-paper';
import {
    Overlay,
    Button
} from 'react-native-elements';
import CreateTaskModal from '../../components/CreateTaskModal';
import CreatePersonModal from '../../components/CreatePersonModal';
import ChangePerson from '../../components/ChangePerson';
import TaskInfoModal from '../../components/TaskInfoModal';

import styles from '../../components/ChangePerson/styles';
import DashboardStyles from './../../styles/Dashboard';

import DefaultProfileImg from '../../assets/default-profile-pic.png';
import Loading from '../../components/Loading';
import UserService from '../../services/users/user_service';
import PersonController from '../../controllers/person/person_controller';
import TaskService from '../../services/task/task_service';
import TaskController from '../../controllers/task/task_controller';

const task_service = new TaskService();
const task_controller = new TaskController();

const user_service = new UserService();
const person_controller = new PersonController();
export default class Dashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: {},
            persons: {
                isEmpty: true,
            },
            tasks: {
                isEmpty: true,
            },
            showCreatePersonModal: false,
            showMenuPerson: false,
            selectedPerson: null,
            selectedTask: null,
            showCreateTaskModal: false,
            showTaskInfoModal: false,
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

    toggleCreateTaskModal = (show) => {
        this.setState({ showCreateTaskModal: show })
    }

    toggleTaskInfoModal = (show, task) => {
        this.setState({ showTaskInfoModal: show, selectedTask: task })
    }

    selectPerson = (person) => {
        if(person){
            this.setState({ selectedPerson: person });
        }
    }

    setActiveUser = () => {
        let lastPerson = this.state.persons.data.length - 1;
        this.setState({ selectedPerson: this.state.persons.data[lastPerson] });
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
                        if(this.state.persons) this.fetchTasks();
                    }
                })
            })
            .catch(err => console.log(err))
    }

    fetchTasks = () => {
        if(this.state.selectedPerson){
            task_controller.fetchAllTasks(this.state.selectedPerson.id)
                .then(data => {
                    data.onSnapshot(snapshot => {
                        let data = [];
                        if(snapshot.empty) this.setState({ tasks: {isEmpty: true}, isLoading: false })
                        else {
                            snapshot.forEach(res => {
                                data.push(res.data());
                            })
                            this.setState({
                                tasks: {
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

    openDrawerMenu = () => {
        this.props.navigation.openDrawer();
    }

    componentDidMount() {
        this._isMounted = true;
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        if (this._isMounted) {
            this.fetchUser();
            this.fetchPersons();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedPerson&&prevState.selectedPerson.id !== this.state.selectedPerson.id){
           this.fetchTasks();
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        this._isMounted = false;
    }

    render() {
        return (
            <View style={DashboardStyles.app}>
                <StatusBar barStyle='light-content' backgroundColor='#203f78' translucent={false} />
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
                            <ChangePerson createPersonField={true} persons={this.state.persons.data} setState={this.setState} toggleCreatePersonModal={this.toggleCreatePersonModal} selectPerson={this.selectPerson} menuPersonsHandle={this.menuPersonsHandle} />
                        </Overlay>
                    </View>
                    <View style={DashboardStyles.personInfoArea}>
                        {
                            this.state.isLoading ? 
                                <Loading loadingContentStyle={{ marginTop: 40, }}/>
                            :
                            this.state.persons.isEmpty ?
                            <>
                                <Icon name="frown-open" size={48} color="#fff"/>
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
                        this.state.isLoading ? 
                            <Loading loadingContentStyle={{ marginTop: 120, }}/>
                        :
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
                            <View style={DashboardStyles.tasksArea}>
                                <Overlay
                                    isVisible={this.state.showCreatePersonModal}
                                    onBackdropPress={() => this.toggleCreatePersonModal(false)}
                                    animated={true}
                                    animationType='fade'
                                    overlayStyle={DashboardStyles.modalStyle}
                                >
                                    <CreatePersonModal toggleCreatePersonModal={this.toggleCreatePersonModal} uid={this.state.user.id} />
                                </Overlay>
                                <View style={DashboardStyles.tasksTextArea} >
                                    <Icon style={{ marginTop: 5, marginRight: 4, }} name="tasks" size={22} color="#595959" />
                                    <Text style={DashboardStyles.tasksText}>Tarefas</Text>
                                </View>
                                {
                                    this.state.tasks.isEmpty ?
                                    <View style={DashboardStyles.noTasksFoundArea}>
                                        <Icon name="calendar-times" size={116} />
                                        <Text style={{ fontSize:18, marginTop: 30, fontFamily: 'sans-serif', fontStyle: 'italic', }} >Nenhuma tarefa foi encontrada</Text>
                                        <Overlay
                                            isVisible={this.state.showCreateTaskModal}
                                            onBackdropPress={() => this.toggleCreateTaskModal(false)}
                                            animated={true}
                                            animationType='fade'
                                            overlayStyle={DashboardStyles.modalCreateTaskStyle}
                                        >
                                            <CreateTaskModal toggleCreateTaskModal={this.toggleCreateTaskModal} pid={this.state.selectedPerson && this.state.selectedPerson.id} />
                                        </Overlay>
                                    </View>
                                    :
                                    !!this.state.tasks.data && 
                                    <>
                                        <Overlay
                                            isVisible={this.state.showCreateTaskModal}
                                            onBackdropPress={() => this.toggleCreateTaskModal(false)}
                                            animated={true}
                                            animationType='fade'
                                            overlayStyle={DashboardStyles.modalCreateTaskStyle}
                                        >
                                            <CreateTaskModal toggleCreateTaskModal={this.toggleCreateTaskModal} pid={this.state.selectedPerson && this.state.selectedPerson.id} />
                                        </Overlay>
                                        <View style={DashboardStyles.listOfTasksArea}>
                                            <ScrollView>
                                            
                                                {
                                                    this.state.tasks.data.map((task, index) => (
                                                        (!task.finished && !task.notFulfilled) &&
                                                            <TouchableOpacity key={index} style={DashboardStyles.taskStyle} onPress={() => this.toggleTaskInfoModal(true, task)}>
                                                                <Text>{task.title}</Text>
                                                                <View style={DashboardStyles.taskValuePoints} >
                                                                    <Icon name='coins' size={16} color='#191d24' style={{ marginLeft: 5 }} />
                                                                    <Text style={{ fontSize: 12, }} >+{task.earn}</Text>
                                                                </View>
                                                                {!task.simpleTask && <Icon name="sync" size={15} color='#191d24' style={{ position: 'absolute', right: 80, }} />}
                                                                <Icon name="angle-right" size={24} color='#191d24' style={DashboardStyles.arrowLeftStyle} />
                                                            </TouchableOpacity>
                                                    ))
                                                }
                                                {
                                                    !!this.state.selectedTask &&
                                                    <Overlay
                                                        isVisible={this.state.showTaskInfoModal}
                                                        onBackdropPress={() => this.toggleTaskInfoModal(false, null)}
                                                        animated={true}
                                                        animationType='fade'
                                                        overlayStyle={DashboardStyles.modalTaskInfoStyle}
                                                    >
                                                        <TaskInfoModal 
                                                            toggleTaskInfoModal={this.toggleTaskInfoModal}
                                                            personId={this.state.selectedPerson.id}
                                                            personPoints={this.state.selectedPerson.points}
                                                            task={this.state.selectedTask}
                                                        />
                                                    </Overlay>
                                                }
                                            </ScrollView>
                                        </View>        
                                    </>
                                }
                                
                            </View>
                    }
                </View>
                {
                    !this.state.persons.isEmpty &&
                    <View style={{ alignItems: 'center', position: 'absolute', bottom: 14, right: 0, left: 0, }}>
                        <Button buttonStyle={DashboardStyles.createTaskBtn} onPress={() => this.toggleCreateTaskModal(true)} icon={
                            <Icon name="plus" size={32} />
                        } />
                    </View>
                }
            </View>
        );
    }
}