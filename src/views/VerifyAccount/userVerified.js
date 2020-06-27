import React, { Component, useState, useEffect} from 'react';
import { View, ActivityIndicator, StatusBar, Text } from 'react-native';
import styles from '../../styles';

// ----- SERVICES
import UserService from '../../services/users/user_service';
import UserController from '../../controllers/user/user_controller';
import Loading from '../../components/Loading';

const user_service = new UserService();
const user_controller = new UserController();

// export default function userVerified({ navigation, route }) {
//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         isVerifiedUser();
//     })

//     async function isVerifiedUser() {
//         await user_controller.fetchUser()
//             .then(data => {
//                 console.log(data)
//                 if(data.user.isVerified && data.user.isVerified) navigation.navigate('DrawerNav', { screen: 'Dashboard', params: data });
//                 else navigation.navigate('VerifyAccount', data);
//             })
//             .catch(error => console.log(error))
//     }

//     return (
//         <View style={styles.container}>
//             <Loading color="#203f78" />
//         </View>
//     );
// }
export default class userVerified extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    isVerifiedUser = async (data) => {
        this.setState({
            user:{
                id: data.userOnDB.id,
                name: data.userOnDB.name,
                email: data.userOnDB.email,
                genre: data.userOnDB.genre,
                profilePic: data.userOnDB.profilePic,
                createdAt: data.userOnDB.createdAt,
                updatedAt: data.userOnDB.updatedAt,
                isVerified: data.user.emailVerified
            }
        })
        if(this.state.user.isVerified) this.props.navigation.navigate('DrawerNav', { screen: 'Dashboard', params: {user: this.state.user} });
        else this.props.navigation.navigate('VerifyAccount', this.state.user);
    }

    componentDidMount = async () => {
        this._isMounted = true;
        if(this._isMounted){
            let data = await user_controller.fetchUser();
            setTimeout(() => {
                this.isVerifiedUser(data);
            }, 700)
        }
    }

    
    componentWillUnmount = () => {
        this._isMounted = false;
        const abortController = new AbortController();
        abortController.abort();
    }

    render() {
        return (
            <View style={styles.container}>
                <Loading color="#203f78" />
                <Text>Entrando...</Text>
            </View>
        );
    }
}















// export default function userVerified({ navigation, route }) {
    
//     const [user, setUser] = useState({
//         id: null,
//         name: null,
//         email: null,
//         genre: null,
//         profilePic: null,
//         createdAt: null,
//         updatedAt: null,
//         isVerified: null,
//     })

//     useEffect(() => {
//         const abortController = new AbortController();
//         isVerifiedUser();
//         return function cleanup() {
//             abortController.abort();
//         };
//     }, [])


//     function isVerifiedUser() {
//         user_controller.fetchUser()
//             .then((data) => {
//                 let isVerified = data.user.emailVerified;
//                 setUser({
//                     id: data.userOnDB.id,
//                     name: data.userOnDB.name,
//                     email: data.userOnDB.email,
//                     genre: data.userOnDB.genre,
//                     profilePic: data.userOnDB.profilePic,
//                     createdAt: data.userOnDB.createdAt,
//                     updatedAt: data.userOnDB.updatedAt,
//                     isVerified
//                 })
//                 navigatePage();
//             })
//             .catch(error => console.log(error))
//     }

//     function navigatePage() {
//         if(user.isVerified) navigation.navigate('Dashboard', user);
//         else navigation.navigate('VerifyAccount', user);
//     }

//     return(
//         <View style={styles.container}>
//             <ActivityIndicator />
//         </View>
//     );
// }