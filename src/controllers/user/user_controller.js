import firebase from '../../configs/firebase';
import 'firebase/firestore';

import UserService from '../../services/users/user_service';

const user_service = new UserService();
const firestore = firebase.firestore();

export default class UserController {
    create = async (user) => {
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            let auth_user = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
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
            return auth_user
        } catch (error) {
            return Promise.reject(user_service.errorsTranslate(error));
        }       
    }

    fetchUser = async () => {
        let user = await firebase.auth().currentUser
        let userOnDB;
        if(user)
            userOnDB = await firestore.collection('users').doc(user.uid).get();
            return {
                user, userOnDB: userOnDB.data()
            }
    }

    fetchUid = async () => {
        try {
            return await firebase.auth().currentUser.uid
        } catch (error) {
            return Promise.reject(error);
        }
    }

}