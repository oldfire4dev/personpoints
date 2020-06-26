import firebase from '../../configs/firebase';
import 'firebase/firestore';

import AsyncStorage from '@react-native-community/async-storage';
import UserService from '../../services/users/user_service';

const user_service = new UserService();
const firestore = firebase.firestore();

export default class UserController {
    create = async (user) => {
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            let auth_user = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            AsyncStorage.setItem('auth_user', JSON.stringify(auth_user.user));
            if(auth_user) {
                let uid = auth_user.user.uid;
                auth_user.user.sendEmailVerification();
                user_service.saveUserOnDB(user, uid)
                return auth_user;
            }    
        } catch (error) {
            return Promise.reject(user_service.errorsTranslate(error));
        }
        
    }

    login = async (user) => {
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            let auth_user = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            AsyncStorage.setItem('auth_user', JSON.stringify(auth_user.user));
            return auth_user
        } catch (error) {
            return Promise.reject(user_service.errorsTranslate(error));
        }       
    }

    fetchUser = async (user) => {
        let userOnDB;
        if(user){
            userOnDB = await firestore.collection('users').doc(user.uid).get();
            return {
                user, userOnDB: userOnDB.data()
            }
        }
    }

    fetchUid = async () => {
        try {
            return await firebase.auth().currentUser.uid
        } catch (error) {
            return Promise.reject(error);
        }
    }

    sendResetPassword = async (emailReset) => {
        try {
            return await firebase.auth().sendPasswordResetEmail(emailReset);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    updateProfilePicture = async (uid, newProfilePic) => {
        try {
            user_service.updateProfilePic(uid, newProfilePic)
        } catch (error) {
            return Promise.reject(error.message)
        }
    }

    delete = async (uid) => {
        try {
            await firestore.collection('users').doc(uid).delete();
            await firebase.auth().currentUser.delete();
        } catch (error) {
            return Promise.reject(error)
        }
    }

    update = async (uid, newValue, type) => {
        try {
            return await user_service.updateNewChanges(uid, newValue, type);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}