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
            taskTimesCount: 0,
            simpleTask: task.simpleTask,
            personId: pid,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    updateTask = async (tid, task) => {
        let doc = firestore.collection('tasks').doc(tid)
        doc.update({
            finished: task.finished
        })
    }

    timestamp = () => {
        return new Date();
    }
}