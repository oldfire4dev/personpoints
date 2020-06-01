import firebase from '../../configs/firebase';

const firestore = firebase.firestore();

export default class ObjectiveService {
    createObjective = async (objective, pid) => {
        let doc = firestore.collection('objectives').doc()
        doc.set({
            id: doc.id,
            title: objective.title,
            cost: objective.cost,
            finished: false,
            cancelled: false,
            personId: pid,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    updateObjective = async (oid, objective) => {
        let doc = firestore.collection('objectives').doc(oid)
        doc.update({
            finished: objective.finished,
        })
    }

    timestamp = () => {
        return new Date();
    }
}