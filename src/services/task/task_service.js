import firebase from '../../configs/firebase';

const firestore = firebase.firestore();

export default class TaskService {
    createTask = async (task, pid) => {
        let doc = firestore.collection('tasks').doc()
        doc.set({
            id: doc.id,
            title: task.title,
            earn: task.earn,
            finished: false,
            taskTime: task.taskTime,
            personId: pid,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    timestamp = () => {
        return new Date();
    }
}