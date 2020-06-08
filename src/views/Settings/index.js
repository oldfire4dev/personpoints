import React, { Component } from 'react';

import SettingsStyles from '../../styles/Settings';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import {
    Overlay,
} from 'react-native-elements';

import Toast from 'react-native-root-toast';
import DefaultProfileImg from '../../assets/default-profile-pic.png';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Loading from '../../components/Loading';
import * as ImagePicker from 'expo-image-picker';

import UserService from '../../services/users/user_service';
import UserController from '../../controllers/user/user_controller';
import EditUserAccount from '../../components/EditUserAccount';

const user_controller = new UserController();

export default class Settings extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: { isEmpty: true },
            showEditAccountModal: false,
            modalType: null,
        }
    }

    openDrawerMenu = () => {
        this.props.navigation.openDrawer();
    }

    fetchUser = () => {
        this.setState({
            user: {
                data: this.props.route.params.user,
                isEmpty: false
            },
            isLoading: false
        })
    }

    toggleEditAccountModal = (show, type) => {
        this.setState({ showEditAccountModal: show, modalType: type });
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted){
            this.fetchUser();
        }
    }

    changeProfilePicHandle = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if(status) this.pickImage();
        else return
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.cancelled) {
            user_controller.updateProfilePicture(this.state.user.data.id, result.uri)
                .then(() => {
                    Toast.show('Foto atualizada com sucesso', {
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
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={SettingsStyles.app}>
                <View style={SettingsStyles.headerArea}>
                    <View style={SettingsStyles.personArea}>
                        <TouchableOpacity onPress={() => this.openDrawerMenu()}>
                            <Icon name="bars" size={26} color="#474747" />
                        </TouchableOpacity>
                        <Text style={SettingsStyles.titleText}>Configurações</Text>
                        <Text></Text>
                    </View>
                </View>
                <View style={SettingsStyles.contentArea}>
                    {
                        this.state.isLoading ?
                            <Loading loadingContentStyle={{ marginTop: 120, }}/>
                        :
                        this.state.user.isEmpty?
                            <View>
                                <Text>Nenhum usuário logado.</Text>
                            </View>
                            :
                            <View style={SettingsStyles.listInfoUser}>
                                <ScrollView>
                                    <TouchableOpacity
                                        style={SettingsStyles.editProfilePic}
                                        onPress={() => this.changeProfilePicHandle()}
                                    >
                                        <Image
                                            style={SettingsStyles.imageProfile}
                                            source={ this.state.user.data.profilePic ? { uri: this.state.user.data.profilePic } : DefaultProfileImg } 
                                        />
                                        <Text style={{ color: '#203f78', marginTop: 7, }} >alterar imagem</Text>
                                    </TouchableOpacity>
                                    <View style={SettingsStyles.settingInfoArea}>
                                        <View style={{ marginBottom: 10, }} >
                                            <Text style={SettingsStyles.settingText}>Email</Text>
                                            <TouchableOpacity style={SettingsStyles.settingInfo} onPress={() => this.toggleEditAccountModal(true, 'email')}>
                                                <Text>{this.state.user.data.email}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginBottom: 10, }} >
                                            <Text style={SettingsStyles.settingText}>Nome</Text>
                                            <TouchableOpacity style={SettingsStyles.settingInfo} onPress={() => this.toggleEditAccountModal(true, 'name')}>
                                                <Text>{this.state.user.data.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                                <Overlay
                                    isVisible={this.state.showEditAccountModal}
                                    onBackdropPress={() => this.toggleEditAccountModal(false)}
                                    animated={true}
                                    animationType='fade'
                                    overlayStyle={SettingsStyles.modalStyle}
                                >
                                    <EditUserAccount
                                        toggleEditAccountModal={this.toggleEditAccountModal}
                                        user={this.state.user.data}
                                        modalType={this.state.modalType}
                                    />
                                </Overlay>
                            </View>
                    }
                </View>
            </View>
        );
    }
}