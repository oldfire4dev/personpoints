import firebase from '../../configs/firebase';
import 'firebase/firestore';

import ObjectiveService from '../../services/objective/objective_service';

const objective_service = new ObjectiveService();
const firestore = firebase.firestore();

export default class ObjectiveController {
    create = async (objective, pid) => {
        try {
            objective_service.createObjective(objective, pid);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    delete = async (oid) => {
        try {
            firestore.collection('objectives').doc(oid).delete();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    fetchAllObjectives = async (pid) => {
        try {
            return firestore.collection('objectives').where('personId', '==', pid)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    update = async (oid, objective) => {
        try {
            return objective_service.updateObjective(oid, objective);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    cancell = async (oid, objective) => {
        try {
            firestore.collection('objectives').doc(oid)
            .update({
                cancelled: objective.cancelled,
                updatedAt: this.timestamp().getTime(),
            })
        } catch (error) {
            return Promise.reject(error);
        }
    }

    timestamp = () => {
        return new Date();
    }

}