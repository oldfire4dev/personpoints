import firebase from '../../configs/firebase';

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

    logoutUser = () => {
        return firebase.auth().signOut()
    }

    timestamp = () => {
        return new Date();
    }
}