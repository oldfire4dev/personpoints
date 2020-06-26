import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    Avatar,
} from 'react-native-paper';
import {
    Overlay,
} from 'react-native-elements';
import Loading from '../../components/Loading';
import ChangePerson from '../../components/ChangePerson';
import TaskInfoModal from '../../components/TaskInfoModal';

import TasksStyles from '../../styles/Tasks';

import DefaultProfileImg from '../../assets/default-profile-pic.png';
import UserController from '../../controllers/user/user_controller';
import PersonController from '../../controllers/person/person_controller';
import TaskService from '../../services/task/task_service';
import TaskController from '../../controllers/task/task_controller';

const task_service = new TaskService();
const task_controller = new TaskController();

const user_controller = new UserController();
const person_controller = new PersonController();

export default class Tasks extends Component{
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            persons: { isEmpty: true },
            tasks: { isEmpty: true },
            selectedPerson: null,
            selectedTask: null,
            showMenuPerson: false,
            showTaskInfoModal: false,
        }
    }

    fetchUserId = () => {
        user_controller.fetchUid()
            .then(result => this.fetchPersons(result))
            .catch(err => console.log(err));
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

    menuPersonsHandle = (value) => {
        this.setState({ showMenuPerson: value });
    }

    toggleTaskInfoModal = (show, task) => {
        this.setState({ showTaskInfoModal: show, selectedTask: task })
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
                        } })
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
        if (this._isMounted) {
            this.fetchUserId();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedPerson&&prevState.selectedPerson.id !== this.state.selectedPerson.id){
           this.fetchTasks();
        }
    }

    render() {
        return(
            <View style={TasksStyles.app}>
                <View style={TasksStyles.headerArea}>
                    <View style={TasksStyles.personArea}>
                        <TouchableOpacity onPress={() => this.openDrawerMenu()}>
                            <Icon name="bars" size={26} color="#474747" />
                        </TouchableOpacity>
                        {
                            this.state.isLoading ? 
                                <Loading loadingContentStyle={{ marginTop: 5, }}/>
                            :
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
                                    overlayStyle={TasksStyles.modalChangePersonStyle}
                                >
                                    <ChangePerson createPersonField={false} persons={this.state.persons.data} setState={this.setState} toggleCreatePersonModal={this.toggleCreatePersonModal} selectPerson={this.selectPerson} menuPersonsHandle={this.menuPersonsHandle} />
                                </Overlay>
                            </>
                        }
                    </View>
                </View>
                <View style={TasksStyles.contentArea}>
                    {
                        this.state.isLoading ? 
                            <Loading loadingContentStyle={{ marginTop: 120, }}/>
                        :
                        this.state.persons.isEmpty ?
                        <View style={TasksStyles.contentPersonsEmpty}>
                            <Icon name="frown-open" size={72} color="#343434"/>
                            <Text style={TasksStyles.noPersonText}>Nenhuma pessoa foi encontrada</Text>
                        </View>
                        :
                        this.state.tasks.isEmpty ?
                            <View style={TasksStyles.noTasksFoundArea}>
                                <Icon name="calendar-times" size={116} />
                                <Text style={{ fontSize:18, marginTop: 30, fontFamily: 'sans-serif', fontStyle: 'italic', }} >Nenhuma tarefa foi encontrada</Text>
                            </View>
                            :
                            <>
                                {
                                    !!this.state.tasks.data &&
                                    <View style={TasksStyles.listOfTasksArea}>
                                        <View>
                                            <Text style={{ alignSelf: 'center', fontSize: 19, fontWeight: 'bold', letterSpacing: .45, }} >Histórico</Text>
                                        </View>
                                        <ScrollView style={{ marginTop: 6, }} >
                                            {
                                                this.state.tasks.data.map((task, index) => (
                                                    <TouchableOpacity key={index} style={TasksStyles.taskStyle} onPress={() => this.toggleTaskInfoModal(true, task)} >
                                                        <Text>{task.title}</Text>
                                                        {!task.simpleTask && <Icon name="sync" size={15} color='#191d24' style={{ position: 'absolute', right: 110, }} />}
                                                        <Icon size={19} name="check-circle" color={task.finished ? '#34cc0e' : '#bfbfbf'} style={{ position: 'absolute', right: 75, }}  />
                                                        <View style={TasksStyles.taskValuePoints} >
                                                            <Icon name='coins' size={16} color='#191d24' style={{ marginLeft: 5 }} />
                                                            <Text style={{ fontSize: 12, }} >+{task.earn}</Text>
                                                        </View>
                                                        <Icon name="angle-right" size={24} color='#191d24' style={TasksStyles.arrowLeftStyle} />
                                                    </TouchableOpacity>
                                                ))
                                            }
                                            <Overlay
                                                isVisible={this.state.showTaskInfoModal}
                                                onBackdropPress={() => this.toggleTaskInfoModal(false, null)}
                                                animated={true}
                                                animationType='fade'
                                                overlayStyle={TasksStyles.modalTaskInfoStyle}
                                            >
                                                <TaskInfoModal 
                                                    toggleTaskInfoModal={this.toggleTaskInfoModal}
                                                    personId={this.state.selectedPerson.id}
                                                    personPoints={this.state.selectedPerson.points}
                                                    task={this.state.selectedTask}
                                                />
                                            </Overlay>
                                        </ScrollView>
                                    </View>
                                }
                            </>
                    }
                </View>
            </View>
        );
    }
}