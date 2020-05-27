import firebase from '../../configs/firebase';
import firebaseErrors from '../../configs/firebase/auth_errors.json';

const firestore = firebase.firestore();

export default class PersonService {
    createPerson = async (person, uid) => {
        let doc = firestore.collection('persons').doc()
        doc.set({
            id: doc.id,
            name: person.name,
            points: 0,
            // tierName: '',
            // tierNumber: '',
            userId: uid,
            profilePic: person.profilePic,
            genre: person.genre,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    timestamp = () => {
        return new Date();
    }
}