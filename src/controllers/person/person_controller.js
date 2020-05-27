import firebase from '../../configs/firebase';
import 'firebase/firestore';

import PersonService from '../../services/person/person_service';

const person_service = new PersonService();
const firestore = firebase.firestore();

export default class PersonController {
    create = async (person, uid) => {
        try {
            person_service.createPerson(person, uid);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    fetchAllPersons = async (uid) => {
        try {
            return firestore.collection('persons').where('userId', '==', uid)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    fetchProfileCartoons = async () => {
        try {
            return firestore.collection('profile_cartoons')
        } catch (error) {
            return Promise.reject(error);
        }
    }

}