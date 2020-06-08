import firebase from '../../configs/firebase';
import firebaseErrors from '../../configs/firebase/auth_errors.json';

const firestore = firebase.firestore();

export default class UserService {
    saveUserOnDB = async (user, uid) => {
        let collection = firestore.collection('users').doc(uid);
        collection.set({
            id: uid,
            name: user.name,
            email: user.email,
            profilePic: user.profilePicURL,
            genre: user.genre,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    isAuthUser = () => {
        return firebase.auth().currentUser ? true : false
    }

    sendEmailVerification = async () => {
        return await firebase.auth().currentUser.sendEmailVerification();
    }

    isVerifiedEmail = async () => {
        try{
            return await firebase.auth().currentUser.emailVerified
        }
        catch(err) {
            return Promise.reject(err);
        }
    }

    updateProfilePic = async (uid, newProfilePic) => {
        let doc = firestore.collection('users').doc(uid);
        let responseImg, img;
        responseImg = await fetch(newProfilePic);
        img = await responseImg.blob();
        firebase.storage().ref(`profile_pics/${uid}`).put(img);
        let url = await firebase.storage().ref(`profile_pics/${uid}`).getDownloadURL();
        doc.update({
            profilePic: url,
        })
    }

    logoutUser = () => {
        return firebase.auth().signOut()
    }

    errorsTranslate = (error) => {
        var ptError
        firebaseErrors.translate.forEach(errorList => {
            if(error.code == "auth/"+errorList.code) ptError = errorList.portuguese;
        });
        return ptError;
    }

    updateNewChanges = (uid, newValue, type) => {
        if(type == 'email'){
            let doc = firestore.collection('users').doc(uid);
            firebase.auth().currentUser.updateEmail(newValue)
            doc.update({ email: newValue });
        }
        else if(type == 'name'){
            let doc = firestore.collection('users').doc(uid);
            firebase.auth().currentUser.updateProfile({ displayName: newValue })
            doc.update({ name: newValue });
        }
    }

    timestamp = () => {
        return new Date();
    }
}